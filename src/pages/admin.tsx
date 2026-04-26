import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'wouter';
import { Upload, Trash2, LogOut, Loader2, Image as ImageIcon, ArrowLeft, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PASSWORD_STORAGE_KEY = 'marzam-admin-password';

interface GalleryImage {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

export function Admin() {
  const { toast } = useToast();
  const [password, setPassword] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? sessionStorage.getItem(PASSWORD_STORAGE_KEY)
      : null,
  );
  const [pwInput, setPwInput] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const saveOrderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadImages = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch('/api/gallery', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load gallery');
      const data = await res.json();
      setImages(data.images ?? []);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Could not load gallery',
        description: 'Please try refreshing the page.',
        variant: 'destructive',
      });
    } finally {
      setListLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (password) loadImages();
  }, [password, loadImages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwInput.trim()) return;
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'x-admin-password': pwInput },
      });
      if (!res.ok) {
        setLoginError('Incorrect password. Please try again.');
        return;
      }
      sessionStorage.setItem(PASSWORD_STORAGE_KEY, pwInput);
      setPassword(pwInput);
      setPwInput('');
    } catch {
      setLoginError('Could not reach the server.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
    setPassword(null);
    setImages([]);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0 || !password) return;

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'x-admin-password': password },
          body: fd,
        });
        if (res.status === 401) {
          handleLogout();
          toast({
            title: 'Session expired',
            description: 'Please log in again.',
            variant: 'destructive',
          });
          break;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? 'Upload failed');
        }
        const data = await res.json();
        setImages(data.images ?? []);
        successCount += 1;
      } catch (err) {
        console.error(err);
        failCount += 1;
      }
    }

    setUploading(false);
    if (successCount > 0) {
      toast({
        title: `Uploaded ${successCount} image${successCount > 1 ? 's' : ''}`,
        description:
          failCount > 0
            ? `${failCount} file${failCount > 1 ? 's' : ''} failed.`
            : 'They are now live in the gallery.',
      });
    } else if (failCount > 0) {
      toast({
        title: 'Upload failed',
        description: 'Make sure files are JPG, PNG, WebP or GIF under 15 MB.',
        variant: 'destructive',
      });
    }
  };

  const persistOrder = useCallback(
    async (orderedIds: string[]) => {
      if (!password) return;
      setSavingOrder(true);
      try {
        const res = await fetch('/api/admin/gallery/order', {
          method: 'PUT',
          headers: {
            'x-admin-password': password,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ ids: orderedIds }),
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        if (!res.ok) throw new Error('Reorder failed');
        const data = await res.json();
        setImages(data.images ?? []);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Could not save new order',
          description: 'Please try again.',
          variant: 'destructive',
        });
        loadImages();
      } finally {
        setSavingOrder(false);
      }
    },
    [password, toast, loadImages],
  );

  const onDragStart = (id: string) => (e: React.DragEvent) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (id: string) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (overId !== id) setOverId(id);
  };

  const onDragLeave = () => {
    setOverId(null);
  };

  const onDrop = (targetId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = dragId ?? e.dataTransfer.getData('text/plain');
    setDragId(null);
    setOverId(null);
    if (!sourceId || sourceId === targetId) return;

    const fromIdx = images.findIndex((i) => i.id === sourceId);
    const toIdx = images.findIndex((i) => i.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const next = [...images];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setImages(next);

    if (saveOrderTimer.current) clearTimeout(saveOrderTimer.current);
    saveOrderTimer.current = setTimeout(() => {
      persistOrder(next.map((i) => i.id));
    }, 250);
  };

  const onDragEnd = () => {
    setDragId(null);
    setOverId(null);
  };

  const handleDelete = async (id: string) => {
    if (!password) return;
    if (!confirm('Remove this image from the gallery?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error('Delete failed');
      const data = await res.json();
      setImages(data.images ?? []);
      toast({ title: 'Image removed' });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Could not remove image',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (!password) {
    return (
      <div className="min-h-screen bg-[#FBF8F0] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-primary/20 rounded-sm p-10 shadow-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter the admin password to manage gallery photos.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 border border-input bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}
            <Button
              type="submit"
              disabled={loginLoading || !pwInput.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-[#AD9234] py-6"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
          <Link
            href="/"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F0]">
      <header className="bg-white border-b border-primary/15">
        <div className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-foreground">
              Gallery Admin
            </h1>
            <p className="text-xs text-muted-foreground tracking-wide">
              Manage photos shown on the public site
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> View site
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-10">
        <section className="bg-white border border-primary/15 rounded-sm p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl text-foreground mb-1">
                Add new photos
              </h2>
              <p className="text-sm text-muted-foreground">
                JPG, PNG, WebP or GIF · up to 15 MB each · select multiple at
                once
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
              <span className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-[#AD9234] px-6 py-3 rounded-sm font-medium transition-colors text-sm">
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Choose photos
                  </>
                )}
              </span>
            </label>
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
            <h2 className="font-serif text-xl text-foreground">
              Current gallery
            </h2>
            <span className="text-sm text-muted-foreground">
              {images.length} {images.length === 1 ? 'image' : 'images'}
              {savingOrder && (
                <span className="ml-3 inline-flex items-center text-xs text-primary">
                  <Loader2 className="w-3 h-3 animate-spin mr-1" /> Saving order…
                </span>
              )}
            </span>
          </div>
          {images.length > 1 && (
            <p className="text-xs text-muted-foreground mb-5">
              Drag any photo to reorder — the new order is saved automatically
              and reflected on the public site.
            </p>
          )}

          {listLoading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
            </div>
          ) : images.length === 0 ? (
            <div className="border border-dashed border-primary/30 rounded-sm py-20 text-center text-muted-foreground bg-white">
              <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No uploaded photos yet.</p>
              <p className="text-xs mt-1">
                The site falls back to its built-in gallery until you add some.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => {
                const isDragging = dragId === img.id;
                const isOver = overId === img.id && dragId !== img.id;
                return (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={onDragStart(img.id)}
                    onDragOver={onDragOver(img.id)}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop(img.id)}
                    onDragEnd={onDragEnd}
                    className={`group relative aspect-square overflow-hidden rounded-sm bg-white border cursor-move transition-all ${
                      isDragging
                        ? 'opacity-40 border-primary'
                        : isOver
                          ? 'border-primary ring-2 ring-primary/40 scale-[1.02]'
                          : 'border-primary/10'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.filename}
                      className="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-sm bg-black/65 text-white text-[11px] font-medium tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-3 h-3" /> #{idx + 1}
                    </div>
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={deletingId === img.id}
                      aria-label="Delete image"
                      className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/65 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all disabled:opacity-100"
                    >
                      {deletingId === img.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
