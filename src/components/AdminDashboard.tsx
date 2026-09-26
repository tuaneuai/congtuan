import React, { useState, useRef } from 'react';
import {
  X,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Star,
  Tag,
  Truck,
  Video,
  Check,
  Trash2,
  Edit2,
  Lock,
  Plus,
  RefreshCw,
  Eye,
  Image as ImageIcon,
  Film,
  Upload,
  ExternalLink,
  Sparkles,
  AlertCircle,
  LogOut,
  Save,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder, DiscountCode, ProductVariant, GalleryItem, VideoItem } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    orders,
    updateOrderStatus,
    reviews,
    approveReview,
    deleteReview,
    variants,
    updateVariantPrice,
    shippingMethods,
    updateShippingMethod,
    discountCodes,
    addDiscountCode,
    deleteDiscountCode,
    settings,
    updateSettings,
    formatPrice,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGalleryItems,
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
    setMainVideo,
    mediaSettings,
    updateMediaSettings,
    topBannerSettings,
    updateTopBannerSettings
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'kpi' | 'orders' | 'products' | 'images' | 'videos' | 'reviews' | 'shipping' | 'discounts' | 'settings'
  >('kpi');

  // Auth password input
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Discount code form
  const [newCode, setNewCode] = useState({ code: '', discountPercent: 10, description: '' });

  // Selected Order for detail inspection
  const [inspectOrder, setInspectOrder] = useState<CustomerOrder | null>(null);

  // Variant editing state
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

  // Image Management States
  const [newImage, setNewImage] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'product',
    subtitle: '',
    imageUrl: '',
    accent: 'K-Beauty Care'
  });
  const [editingImage, setEditingImage] = useState<GalleryItem | null>(null);
  const [imageTab, setImageTab] = useState<'gallery' | 'before_after' | 'top_banner'>('gallery');
  const [imageSuccessMsg, setImageSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Top Luxury Banner Frame Form State
  const [bannerForm, setBannerForm] = useState(topBannerSettings);
  const [bannerSaved, setBannerSaved] = useState(false);

  // Before & After image inputs
  const [tempBeforeImg, setTempBeforeImg] = useState(mediaSettings.beforeImageUrl || '');
  const [tempAfterImg, setTempAfterImg] = useState(mediaSettings.afterImageUrl || '');
  const [beforeAfterSaved, setBeforeAfterSaved] = useState(false);


  // Video Management States
  const [mainVideoUrl, setMainVideoUrl] = useState(settings.videoUrl);
  const [mainVideoPoster, setMainVideoPoster] = useState('');
  const [mainVideoTitle, setMainVideoTitle] = useState('SEYOUL Collagen Jelly Mask – Official Presentation');
  const [videoSaved, setVideoSaved] = useState(false);

  // New video clip form
  const [newClip, setNewClip] = useState<{
    title: string;
    url: string;
    posterUrl: string;
    duration: string;
    type: 'youtube' | 'vimeo' | 'mp4';
    description: string;
  }>({
    title: '',
    url: '',
    posterUrl: '',
    duration: '0:45',
    type: 'youtube',
    description: ''
  });
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Mật khẩu không chính xác. Mật khẩu mẫu là: admin123');
    }
  };

  // KPI Calculations
  const totalRevenueCZK = orders.reduce((sum, o) => sum + o.totalCZK, 0);
  const totalOrdersCount = orders.length;
  const averageOrderValueCZK = totalOrdersCount > 0 ? Math.round(totalRevenueCZK / totalOrdersCount) : 0;
  const conversionRate = '3.8%';

  const handleSaveMainVideo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ videoUrl: mainVideoUrl });
    const mainVid = videos.find((v) => v.isMain);
    if (mainVid) {
      updateVideo(mainVid.id, {
        url: mainVideoUrl,
        posterUrl: mainVideoPoster || mainVid.posterUrl,
        title: mainVideoTitle || mainVid.title
      });
    }
    setVideoSaved(true);
    setTimeout(() => setVideoSaved(false), 3000);
  };

  const handleSaveTopBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateTopBannerSettings(bannerForm);
    setBannerSaved(true);
    setImageSuccessMsg('Đã lưu cấu hình Khung Banner Đầu Trang thành công!');
    setTimeout(() => {
      setBannerSaved(false);
      setImageSuccessMsg('');
    }, 3500);
  };


  const handleAddVideoClip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClip.title || !newClip.url) return;
    addVideo({
      title: newClip.title,
      url: newClip.url,
      posterUrl: newClip.posterUrl || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
      type: newClip.type,
      duration: newClip.duration || '0:45',
      isMain: false,
      description: newClip.description
    });
    setNewClip({
      title: '',
      url: '',
      posterUrl: '',
      duration: '0:45',
      type: 'youtube',
      description: ''
    });
    setImageSuccessMsg('Đã thêm video mới thành công!');
    setTimeout(() => setImageSuccessMsg(''), 3000);
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title) return;
    addGalleryItem({
      title: newImage.title,
      category: newImage.category,
      subtitle: newImage.subtitle || 'Chăm sóc da chuẩn spa Hàn Quốc',
      imageUrl: newImage.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
      accent: newImage.accent || 'K-Beauty Luxury'
    });
    setNewImage({
      title: '',
      category: 'product',
      subtitle: '',
      imageUrl: '',
      accent: 'K-Beauty Care'
    });
    setImageSuccessMsg('Đã thêm hình ảnh vào thư viện thành công!');
    setTimeout(() => setImageSuccessMsg(''), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      if (editingImage) {
        setEditingImage({ ...editingImage, imageUrl: base64 });
      } else {
        setNewImage({ ...newImage, imageUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBeforeAfter = (e: React.FormEvent) => {
    e.preventDefault();
    updateMediaSettings({
      beforeImageUrl: tempBeforeImg,
      afterImageUrl: tempAfterImg
    });
    setBeforeAfterSaved(true);
    setTimeout(() => setBeforeAfterSaved(false), 3000);
  };

  const handleAddDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.code) return;
    addDiscountCode({
      code: newCode.code.trim().toUpperCase(),
      discountPercent: Number(newCode.discountPercent),
      description: newCode.description || `Giảm giá ${newCode.discountPercent}%`,
      active: true
    });
    setNewCode({ code: '', discountPercent: 10, description: '' });
  };

  const handleSaveVariant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVariant) return;
    updateVariantPrice(editingVariant.id, editingVariant.priceCZK, editingVariant.originalPriceCZK);
    setEditingVariant(null);
  };

  // Helper presets for quick testing
  const applyPresetImage = (url: string, title: string, category: GalleryItem['category'], accent: string) => {
    setNewImage({
      title,
      category,
      subtitle: 'Hình ảnh thực tế độ nét cao cho SEYOUL K-Beauty',
      imageUrl: url,
      accent
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-4 sm:my-8 max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold tracking-wide">
                  HỆ THỐNG QUẢN TRỊ SEYOUL K-BEAUTY
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Quản lý sản phẩm, đơn hàng, hình ảnh, video, cước vận chuyển & doanh thu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminAuthenticated(false)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                title="Đăng xuất khỏi trang quản trị"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              title="Đóng bảng quản trị"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdminAuthenticated ? (
          /* Login Form */
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto border border-sky-100 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Đăng Nhập Quản Trị Viên
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Khu vực dành riêng cho ban quản trị SEYOUL Store. Vui lòng nhập mật khẩu xác thực để tiếp tục.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mật khẩu Admin
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu (Mặc định: admin123)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {authError}
                  </p>
                )}
                <p className="text-[11px] text-slate-400 mt-2">
                  * Gợi ý mật khẩu thử nghiệm: <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">admin123</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-sky-700 text-white font-semibold text-sm transition-colors shadow-lg cursor-pointer"
              >
                Mở khóa Bảng Quản Trị
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Navigation Tabs Bar */}
            <div className="flex items-center gap-1 px-4 sm:px-6 py-2 bg-slate-100/90 border-b border-slate-200 overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('kpi')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'kpi'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>Báo Cáo Doanh Thu</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                <span>Đơn Hàng ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Giá & Gói Combo</span>
              </button>

              <button
                onClick={() => setActiveTab('images')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'images'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200 ring-1 ring-sky-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-indigo-700">Quản Lý Hình Ảnh ({galleryItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'videos'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200 ring-1 ring-sky-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Film className="w-4 h-4 text-rose-600" />
                <span className="font-bold text-rose-700">Quản Lý Video</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Star className="w-4 h-4 text-amber-500" />
                <span>Đánh Giá ({reviews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Truck className="w-4 h-4 text-purple-600" />
                <span>Vận Chuyển</span>
              </button>

              <button
                onClick={() => setActiveTab('discounts')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'discounts'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Tag className="w-4 h-4 text-teal-600" />
                <span>Mã Giảm Giá</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white text-sky-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Sliders className="w-4 h-4 text-slate-700" />
                <span>Cài Đặt</span>
              </button>
            </div>

            {/* Tab Contents Area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* TAB 1: KPI OVERVIEW */}
              {activeTab === 'kpi' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Tổng Quan Doanh Thu & Hiệu Quả Bán Hàng
                    </h3>
                    <p className="text-xs text-slate-500">
                      Số liệu thời gian thực được đồng bộ từ các phiên đặt hàng Séc & EU
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Tổng Doanh Thu</span>
                        <TrendingUp className="w-4 h-4 text-sky-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900">
                        {formatPrice(totalRevenueCZK)}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-1">
                        +18.4% so với tuần trước
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Tổng Đơn Hàng</span>
                        <ShoppingCart className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900">
                        {totalOrdersCount} đơn
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Đã xác nhận & đang xử lý
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Giá Trị Đơn Trung Bình (AOV)</span>
                        <Package className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900">
                        {formatPrice(averageOrderValueCZK)}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Ưa chuộng gói 3 BOXY (1 299 Kč)
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Tỷ Lệ Chuyển Đổi</span>
                        <Users className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900">
                        {conversionRate}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-1">
                        Cao hơn 1.2% chuẩn ngành làm đẹp
                      </div>
                    </div>
                  </div>

                  {/* Stock and Best seller info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-slate-900">
                          Tình Trạng Kho Hàng SEYOUL (Praha Hub)
                        </h4>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          Sẵn Hàng
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4">
                        Kho trung tâm Séc còn sẵn <strong className="text-slate-900">{settings.stockCount} hộp</strong>. Thời gian đóng gói và gửi qua Zásilkovna / PPL trung bình 12 tiếng.
                      </p>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-sky-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-slate-900">
                          Gói Combo Bán Chạy Nhất (Best Seller)
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                          74% Doanh số
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>3 BOXY (15 masek)</strong> với đơn giá ưu đãi ~433 Kč/box kèm <strong>Freeship toàn quốc</strong> là lựa chọn được khách hàng Séc & EU đặt mua nhiều nhất.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900">
                        Danh Sách Đơn Hàng Khách Đặt
                      </h3>
                      <p className="text-xs text-slate-500">
                        Xem chi tiết khách hàng, địa chỉ giao hàng và cập nhật tiến độ giao vận
                      </p>
                    </div>
                    <div className="text-xs text-slate-600">
                      Tổng số: <strong>{orders.length} đơn</strong>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="px-4 py-3">Mã Đơn</th>
                            <th className="px-4 py-3">Khách Hàng</th>
                            <th className="px-4 py-3">Địa Chỉ / Điểm Nhận</th>
                            <th className="px-4 py-3">Sản Phẩm</th>
                            <th className="px-4 py-3">Tổng Tiền</th>
                            <th className="px-4 py-3">Trạng Thái</th>
                            <th className="px-4 py-3 text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-4 py-3 font-mono font-bold text-slate-900">
                                {order.orderNumber}
                                <div className="text-[10px] text-slate-400 font-sans">
                                  {order.createdAt}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-semibold text-slate-900">
                                  {order.customer.firstName} {order.customer.lastName}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {order.customer.phone}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {order.customer.email}
                                </div>
                              </td>
                              <td className="px-4 py-3 max-w-[200px]">
                                <div className="text-slate-800 truncate">
                                  {order.customer.street}, {order.customer.city}
                                </div>
                                <div className="text-[10px] text-sky-700 font-medium truncate">
                                  {order.shippingMethod.name}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {order.items.map((it, idx) => (
                                  <div key={idx} className="font-medium text-slate-800">
                                    {it.quantity}x {it.variantName}
                                  </div>
                                ))}
                              </td>
                              <td className="px-4 py-3 font-bold text-slate-900">
                                {formatPrice(order.totalCZK, order.totalEUR)}
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as CustomerOrder['status'])}
                                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${
                                    order.status === 'delivered'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : order.status === 'shipped'
                                      ? 'bg-sky-50 text-sky-800 border-sky-200'
                                      : order.status === 'processing'
                                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                                      : 'bg-purple-50 text-purple-800 border-purple-200'
                                  }`}
                                >
                                  <option value="new">Mới Đặt</option>
                                  <option value="processing">Đang Đóng Gói</option>
                                  <option value="shipped">Đã Giao Vận Chuyển</option>
                                  <option value="delivered">Đã Hoàn Thành</option>
                                </select>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  onClick={() => setInspectOrder(order)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                                >
                                  Xem Hóa Đơn
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCT & PRICING MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Quản Lý Giá & Gói Combo Mặt Nạ (Tỷ lệ 499 Kč / Box)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Chỉnh sửa giá bán, giá gốc và nhãn ưu đãi cho từng combo sản phẩm
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {variants.map((v) => (
                      <div
                        key={v.id}
                        className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between ${
                          v.isPopular ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {v.boxesCount} Hộp ({v.masksCount} Miếng)
                            </span>
                            {v.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                                {v.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mb-2">
                            {v.name}
                          </h4>

                          <div className="space-y-1 mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-slate-900">
                                {v.priceCZK.toLocaleString('cs-CZ')} Kč
                              </span>
                              <span className="text-xs text-slate-400 line-through">
                                {v.originalPriceCZK.toLocaleString('cs-CZ')} Kč
                              </span>
                            </div>
                            <div className="text-xs text-emerald-600 font-semibold">
                              Tiết kiệm: {v.savingsCZK.toLocaleString('cs-CZ')} Kč ({v.savingsPercent}%)
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Đơn giá: ~{Math.round(v.priceCZK / v.boxesCount)} Kč / box
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setEditingVariant(v)}
                          className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Chỉnh Sửa Giá Bán</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Edit Variant Modal */}
                  {editingVariant && (
                    <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-4 max-w-xl">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">
                          Chỉnh sửa giá: {editingVariant.name}
                        </h4>
                        <button
                          onClick={() => setEditingVariant(null)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveVariant} className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Giá bán khuyến mãi (CZK)
                          </label>
                          <input
                            type="number"
                            value={editingVariant.priceCZK}
                            onChange={(e) =>
                              setEditingVariant({
                                ...editingVariant,
                                priceCZK: Number(e.target.value)
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Giá gốc niêm yết (CZK)
                          </label>
                          <input
                            type="number"
                            value={editingVariant.originalPriceCZK}
                            onChange={(e) =>
                              setEditingVariant({
                                ...editingVariant,
                                originalPriceCZK: Number(e.target.value)
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div className="col-span-2 flex items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingVariant(null)}
                            className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100"
                          >
                            Hủy bỏ
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-lg bg-sky-700 text-white font-semibold text-xs hover:bg-sky-800"
                          >
                            Lưu Giá Mới
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: IMAGE MANAGEMENT */}
              {activeTab === 'images' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-indigo-600" />
                        Quản Lý Hình Ảnh & Thư Viện SEYOUL
                      </h3>
                      <p className="text-xs text-slate-500">
                        Thêm mới, chỉnh sửa thông tin, thay thế hoặc gỡ bỏ hình ảnh trong thư viện Gallery và ảnh Trước/Sau
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setImageTab('gallery')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          imageTab === 'gallery'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Thư Viện Ảnh ({galleryItems.length})
                      </button>
                      <button
                        onClick={() => setImageTab('before_after')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          imageTab === 'before_after'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Ảnh Trước & Sau (Before/After)
                      </button>
                      <button
                        onClick={() => setImageTab('top_banner')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                          imageTab === 'top_banner'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Khung Banner Đầu Trang (Luxury)</span>
                      </button>
                    </div>

                  </div>

                  {imageSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      {imageSuccessMsg}
                    </div>
                  )}

                  {imageTab === 'gallery' ? (
                    <div className="space-y-6">
                      {/* Add New Image Box */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-slate-50 to-white border border-indigo-100 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-indigo-600" />
                            {editingImage ? 'Chỉnh Sửa Hình Ảnh' : 'Thêm Hình Ảnh Mới Vào Thư Viện'}
                          </h4>
                          {editingImage && (
                            <button
                              onClick={() => setEditingImage(null)}
                              className="text-xs text-slate-500 hover:text-slate-800 underline"
                            >
                              Đóng chỉnh sửa
                            </button>
                          )}
                        </div>

                        <form
                          onSubmit={
                            editingImage
                              ? (e) => {
                                  e.preventDefault();
                                  updateGalleryItem(editingImage.id, editingImage);
                                  setEditingImage(null);
                                  setImageSuccessMsg('Đã cập nhật ảnh thành công!');
                                  setTimeout(() => setImageSuccessMsg(''), 3000);
                                }
                              : handleAddGalleryItem
                          }
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Đường Dẫn Ảnh (Image URL) hoặc Tải Lên
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  placeholder="https://images.unsplash.com/..."
                                  value={editingImage ? editingImage.imageUrl || '' : newImage.imageUrl}
                                  onChange={(e) =>
                                    editingImage
                                      ? setEditingImage({ ...editingImage, imageUrl: e.target.value })
                                      : setNewImage({ ...newImage, imageUrl: e.target.value })
                                  }
                                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleFileUpload}
                                  accept="image/*"
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer"
                                  title="Chọn file ảnh từ máy tính của bạn"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Tải file</span>
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Danh Mục
                              </label>
                              <select
                                value={editingImage ? editingImage.category : newImage.category}
                                onChange={(e) =>
                                  editingImage
                                    ? setEditingImage({
                                        ...editingImage,
                                        category: e.target.value as GalleryItem['category']
                                      })
                                    : setNewImage({
                                        ...newImage,
                                        category: e.target.value as GalleryItem['category']
                                      })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              >
                                <option value="product">Sản Phẩm & Hộp (Product)</option>
                                <option value="texture">Chất Mask & Gel (Texture)</option>
                                <option value="ritual">Quy Trình Đắp (Ritual)</option>
                                <option value="model">Người Mẫu & Trải Nghiệm (Model)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Huy Hiệu Góc (Accent Badge)
                              </label>
                              <input
                                type="text"
                                placeholder="vd: 5 Pieces / Box"
                                value={editingImage ? editingImage.accent : newImage.accent}
                                onChange={(e) =>
                                  editingImage
                                    ? setEditingImage({ ...editingImage, accent: e.target.value })
                                    : setNewImage({ ...newImage, accent: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Tiêu Đề Ảnh
                              </label>
                              <input
                                type="text"
                                placeholder="vd: Cận cảnh chất thạch Collagen tươi"
                                value={editingImage ? editingImage.title : newImage.title}
                                onChange={(e) =>
                                  editingImage
                                    ? setEditingImage({ ...editingImage, title: e.target.value })
                                    : setNewImage({ ...newImage, title: e.target.value })
                                }
                                required
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Phụ Đề / Mô Tả Ngắn
                              </label>
                              <input
                                type="text"
                                placeholder="vd: Tinh chất thẩm thấu sâu, để lại làn da căng mọng sau 4 giờ"
                                value={editingImage ? editingImage.subtitle : newImage.subtitle}
                                onChange={(e) =>
                                  editingImage
                                    ? setEditingImage({ ...editingImage, subtitle: e.target.value })
                                    : setNewImage({ ...newImage, subtitle: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          {/* Quick Presets for Demo */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="text-[11px] text-slate-500 font-medium">Gợi ý ảnh mẫu:</span>
                            <button
                              type="button"
                              onClick={() =>
                                applyPresetImage(
                                  'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop',
                                  'Hộp SEYOUL Luxury Box',
                                  'product',
                                  'Made in Korea'
                                )
                              }
                              className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                              🎁 Ảnh Hộp Sang Trọng
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                applyPresetImage(
                                  'https://images.unsplash.com/photo-1608248597359-009c91f16f38?q=80&w=900&auto=format&fit=crop',
                                  'Chất Thạch Hydrogel Collagen',
                                  'texture',
                                  'Low-Molecular 300Da'
                                )
                              }
                              className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                              💧 Chất Mask Mọng Nước
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                applyPresetImage(
                                  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop',
                                  'Liệu Trình Đắp Mask Chuẩn Spa',
                                  'ritual',
                                  'Glass Skin Ritual'
                                )
                              }
                              className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                              🧖‍♀️ Người Mẫu Đắp Mask
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('Bạn có chắc chắn muốn khôi phục lại 6 ảnh mặc định ban đầu?')) {
                                  resetGalleryItems();
                                  setImageSuccessMsg('Đã khôi phục danh sách ảnh mặc định!');
                                  setTimeout(() => setImageSuccessMsg(''), 3000);
                                }
                              }}
                              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Khôi phục ảnh mặc định</span>
                            </button>

                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>{editingImage ? 'Lưu Thay Đổi' : 'Thêm Vào Thư Viện'}</span>
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Current Gallery Grid in Admin */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">
                            Các Ảnh Đang Hiển Thị Trong Thư Viện Website ({galleryItems.length})
                          </h4>
                          <span className="text-xs text-slate-500">
                            * Thay đổi sẽ hiển thị ngay lập tức trên trang chủ
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {galleryItems.map((item) => (
                            <div
                              key={item.id}
                              className="p-3 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between group hover:border-indigo-300 transition-all"
                            >
                              <div className="space-y-2">
                                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
                                  {item.imageUrl ? (
                                    <img
                                      src={item.imageUrl}
                                      alt={item.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${item.gradient || 'from-slate-900 to-sky-950'} flex items-center justify-center text-white`}>
                                      <Sparkles className="w-8 h-8 opacity-70" />
                                    </div>
                                  )}
                                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-semibold">
                                    {item.category.toUpperCase()}
                                  </div>
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 text-slate-900 text-[10px] font-bold">
                                    {item.accent}
                                  </div>
                                </div>

                                <div>
                                  <h5 className="font-bold text-xs text-slate-900 truncate">
                                    {item.title}
                                  </h5>
                                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                                <button
                                  onClick={() => {
                                    setEditingImage(item);
                                    window.scrollTo({ top: 120, behavior: 'smooth' });
                                  }}
                                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  <span>Sửa ảnh</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Bạn có chắc chắn muốn xóa ảnh "${item.title}"?`)) {
                                      deleteGalleryItem(item.id);
                                    }
                                  }}
                                  className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Xóa</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : imageTab === 'before_after' ? (
                    /* BEFORE & AFTER PHOTO CONFIG */
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 max-w-3xl">

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Cấu Hình Ảnh So Sánh TRƯỚC & SAU Khi Đắp Mặt Nạ
                        </h4>
                        <p className="text-xs text-slate-500">
                          Tùy biến hình ảnh thanh trượt so sánh làn da trước và sau khi cấp ẩm bằng SEYOUL Collagen Mask
                        </p>
                      </div>

                      <form onSubmit={handleSaveBeforeAfter} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Ảnh TRƯỚC (Before Image URL)
                            </label>
                            <input
                              type="url"
                              value={tempBeforeImg}
                              onChange={(e) => setTempBeforeImg(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                            />
                            {tempBeforeImg && (
                              <div className="mt-2 aspect-4/3 rounded-xl overflow-hidden border border-slate-200">
                                <img src={tempBeforeImg} alt="Before preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Ảnh SAU (After Image URL)
                            </label>
                            <input
                              type="url"
                              value={tempAfterImg}
                              onChange={(e) => setTempAfterImg(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                            />
                            {tempAfterImg && (
                              <div className="mt-2 aspect-4/3 rounded-xl overflow-hidden border border-slate-200">
                                <img src={tempAfterImg} alt="After preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setTempBeforeImg('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop');
                              setTempAfterImg('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop');
                            }}
                            className="text-xs text-sky-600 hover:text-sky-800 underline cursor-pointer"
                          >
                            Dùng bộ ảnh so sánh mẫu chuẩn K-Beauty
                          </button>

                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Lưu Ảnh So Sánh</span>
                          </button>
                        </div>

                        {beforeAfterSaved && (
                          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600" />
                            Đã cập nhật ảnh Trước & Sau thành công!
                          </div>
                        )}
                      </form>
                    </div>
                  ) : (
                    /* TOP LUXURY BANNER FRAME CONFIGURATION */
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                          <div>
                            <h4 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-500" />
                              Cấu Hình Khung Banner Hình Ảnh Đầu Trang Web
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Tùy biến hình ảnh banner, hiệu ứng ánh sáng sang trọng (quét tia sáng kim cương, hào quang cực quang), tiêu đề và nút đặt mua
                            </p>
                          </div>

                          {/* Toggle Enable/Disable Banner */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-slate-700">Trạng thái Banner:</span>
                            <button
                              type="button"
                              onClick={() => setBannerForm({ ...bannerForm, enabled: !bannerForm.enabled })}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                bannerForm.enabled
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${bannerForm.enabled ? 'bg-emerald-200 animate-ping' : 'bg-slate-400'}`} />
                              <span>{bannerForm.enabled ? 'Đang Hiển Thị' : 'Đang Tắt'}</span>
                            </button>
                          </div>
                        </div>

                        <form onSubmit={handleSaveTopBanner} className="space-y-6">
                          {/* 1. Chọn Hiệu Ứng Ánh Sáng Sang Trọng */}
                          <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                              1. Chọn Hiệu Ứng Ánh Sáng Sang Trọng (Luxury Lighting Effect)
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {[
                                {
                                  id: 'diamond-sweep',
                                  name: 'Tia Sáng Kim Cương Quét Chậm',
                                  desc: 'Vệt sáng kim cương quét mượt qua bề mặt ảnh và sản phẩm',
                                  badge: 'Khuyên Dùng'
                                },
                                {
                                  id: 'aurora-glow',
                                  name: 'Hào Quang Cực Quang Ice-Blue',
                                  desc: 'Vầng hào quang xanh ngọc tỏa sáng huyền ảo phía sau',
                                  badge: 'Huyền Ảo'
                                },
                                {
                                  id: 'sparkle-dew',
                                  name: 'Tinh Thể Lấp Lánh & Hạt Sương',
                                  desc: 'Các đốm sáng lấp lánh như tinh thể collagen ngậm nước',
                                  badge: 'Lấp Lánh'
                                }
                              ].map((eff) => (
                                <button
                                  type="button"
                                  key={eff.id}
                                  onClick={() =>
                                    setBannerForm({
                                      ...bannerForm,
                                      lightingEffect: eff.id as 'diamond-sweep' | 'aurora-glow' | 'sparkle-dew'
                                    })
                                  }
                                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                    bannerForm.lightingEffect === eff.id
                                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-200'
                                      : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-bold text-slate-900">{eff.name}</span>
                                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                        {eff.badge}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-snug">{eff.desc}</p>
                                  </div>
                                  <div className="mt-2 text-right">
                                    <span
                                      className={`text-[10px] font-bold ${
                                        bannerForm.lightingEffect === eff.id ? 'text-indigo-600' : 'text-slate-400'
                                      }`}
                                    >
                                      {bannerForm.lightingEffect === eff.id ? '✓ Đang kích hoạt' : 'Chọn hiệu ứng này'}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 2. Thư Viện 4 Ảnh Banner Tuyển Chọn Cao Cấp */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                                2. Chọn Nhanh Ảnh Mẫu Tuyển Chọn Hoặc Dán Link Tự Chọn
                              </label>
                              <span className="text-[11px] text-slate-500">* Bấm vào ảnh để áp dụng ngay</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                {
                                  title: 'Người Mẫu K-Beauty & Làn Da Căng Bóng',
                                  url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop'
                                },
                                {
                                  title: 'Kết Cấu Thạch Collagen & Giọt Sương Trong Suốt',
                                  url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop'
                                },
                                {
                                  title: 'Hộp SEYOUL & Mặt Nước Pha Lê Khúc Xạ',
                                  url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1600&auto=format&fit=crop'
                                },
                                {
                                  title: 'Nghi Thức Dưỡng Da Ban Đêm Sang Trọng',
                                  url: 'https://images.unsplash.com/photo-1512290900672-1f55b9a89669?q=80&w=1600&auto=format&fit=crop'
                                }
                              ].map((preset, idx) => (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => setBannerForm({ ...bannerForm, imageUrl: preset.url })}
                                  className={`relative group rounded-xl overflow-hidden border text-left cursor-pointer transition-all ${
                                    bannerForm.imageUrl === preset.url
                                      ? 'border-indigo-600 ring-2 ring-indigo-300'
                                      : 'border-slate-200 hover:border-indigo-300'
                                  }`}
                                >
                                  <div className="aspect-16/10 bg-slate-900">
                                    <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="p-2 bg-white">
                                    <p className="text-[11px] font-semibold text-slate-800 line-clamp-1">
                                      {preset.title}
                                    </p>
                                    <span
                                      className={`text-[10px] font-bold ${
                                        bannerForm.imageUrl === preset.url ? 'text-indigo-600' : 'text-slate-400'
                                      }`}
                                    >
                                      {bannerForm.imageUrl === preset.url ? '✓ Đang chọn' : 'Áp dụng'}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Custom URL Input */}
                            <div className="mt-3">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Hoặc Dán URL Hình Ảnh Tùy Chỉnh Của Bạn:
                              </label>
                              <input
                                type="url"
                                value={bannerForm.imageUrl}
                                onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                                placeholder="https://example.com/hinh-anh-banner-cao-cap.jpg"
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          {/* 3. Nội Dung Văn Bản & Nhãn Banner */}
                          <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                              3. Nội Dung Văn Bản & Khẩu Hiệu
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Huy Hiệu Nhỏ Trên Cùng (Badge Text)
                                </label>
                                <input
                                  type="text"
                                  value={bannerForm.badgeText}
                                  onChange={(e) => setBannerForm({ ...bannerForm, badgeText: e.target.value })}
                                  placeholder="KOREAN DERMA-LUXURY · 216 000 PPM REAL COLLAGEN"
                                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Nhãn Ưu Đãi Nổi Bật (Discount Tag)
                                </label>
                                <input
                                  type="text"
                                  value={bannerForm.discountBadge || ''}
                                  onChange={(e) => setBannerForm({ ...bannerForm, discountBadge: e.target.value })}
                                  placeholder="SLEVA AŽ 43% + DÁREK"
                                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Tiêu Đề Lớn Banner (Headline)
                                </label>
                                <input
                                  type="text"
                                  value={bannerForm.title}
                                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                                  placeholder="SEYOUL BIO-COLLAGEN REAL DEEP MASK"
                                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-serif font-bold text-sm"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Đoạn Mô Tả Ngắn (Subtitle)
                                </label>
                                <textarea
                                  rows={2}
                                  value={bannerForm.subtitle}
                                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                                  placeholder="Korejský noční rituál pro hlubokou hydrataci a skleněný finiš pleti. Akční cena od 499 Kč / box."
                                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Chữ Nút Đặt Mua (CTA Button)
                                </label>
                                <input
                                  type="text"
                                  value={bannerForm.buttonText}
                                  onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                                  placeholder="KOUPIT V AKCI (OD 499 KČ) →"
                                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Điểm Neo Cuộn Trang (Target Anchor)
                                </label>
                                <input
                                  type="text"
                                  value={bannerForm.targetLink || '#pricing'}
                                  onChange={(e) => setBannerForm({ ...bannerForm, targetLink: e.target.value })}
                                  placeholder="#pricing"
                                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                              </div>
                            </div>
                          </div>

                          {/* 4. Khung Xem Trước Thời Gian Thực (Live Preview Box) */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                                4. Khung Xem Trước Trực Quan Thời Gian Thực (Live Preview)
                              </label>
                              <span className="text-[10px] text-slate-500">Mô phỏng giao diện banner thật ở đầu trang web</span>
                            </div>

                            {/* Rendered Mini Preview Frame with Real-Time Lighting Effect */}
                            <div className="relative overflow-hidden rounded-2xl border border-sky-400/40 bg-gradient-to-r from-slate-950 via-[#0a1829] to-slate-950 text-white p-5 shadow-xl">
                              {/* Ambient Aurora */}
                              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <div className="absolute -top-12 -left-12 w-64 h-64 bg-sky-500/20 rounded-full blur-2xl animate-aurora-glow" />
                                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-600/20 rounded-full blur-2xl animate-aurora-glow" />
                              </div>

                              {/* Light Sweep */}
                              {bannerForm.lightingEffect === 'diamond-sweep' && (
                                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                                  <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-25 animate-light-sweep" />
                                </div>
                              )}

                              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-8 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-sky-950 border border-sky-400/50 text-[10px] font-bold text-sky-200">
                                      ✦ {bannerForm.badgeText || 'KOREAN DERMA-LUXURY'}
                                    </span>
                                    {bannerForm.discountBadge && (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-bold text-amber-300">
                                        🔥 {bannerForm.discountBadge}
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="font-serif font-bold text-base sm:text-lg text-white">
                                    {bannerForm.title || 'SEYOUL BIO-COLLAGEN REAL DEEP MASK'}
                                  </h5>
                                  <p className="text-xs text-slate-300 line-clamp-2">
                                    {bannerForm.subtitle || 'Korejský noční rituál pro hlubokou hydrataci.'}
                                  </p>
                                  <div className="pt-1">
                                    <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-sky-400 to-blue-400 text-slate-950 shadow-sm">
                                      {bannerForm.buttonText || 'KOUPIT V AKCI →'}
                                    </span>
                                  </div>
                                </div>

                                <div className="md:col-span-4">
                                  <div className="aspect-16/10 rounded-xl overflow-hidden border border-white/30 shadow-md">
                                    <img
                                      src={bannerForm.imageUrl}
                                      alt="Preview"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Submit & Reset Actions */}
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                setBannerForm({
                                  enabled: true,
                                  imageUrl:
                                    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
                                  badgeText: 'KOREAN DERMA-LUXURY · 216 000 PPM REAL COLLAGEN',
                                  title: 'SEYOUL BIO-COLLAGEN REAL DEEP MASK',
                                  subtitle:
                                    'Korejský noční rituál pro hlubokou hydrataci a skleněný finiš pleti. Akční cena od 499 Kč / box.',
                                  buttonText: 'KOUPIT V AKCI (OD 499 KČ) →',
                                  targetLink: '#pricing',
                                  lightingEffect: 'diamond-sweep',
                                  discountBadge: 'SLEVA AŽ 43% + DÁREK',
                                  showCountdown: true
                                });
                              }}
                              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Khôi phục mẫu mặc định K-Beauty</span>
                            </button>

                            <button
                              type="submit"
                              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Lưu Cấu Hình Banner Đầu Trang</span>
                            </button>
                          </div>

                          {bannerSaved && (
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                              <Check className="w-4 h-4 text-emerald-600" />
                              Đã lưu và cập nhật Khung Banner Đầu Trang thành công!
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* TAB 5: VIDEO MANAGEMENT */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                      <Film className="w-5 h-5 text-rose-600" />
                      Quản Lý Video Giới Thiệu & Video Clips
                    </h3>
                    <p className="text-xs text-slate-500">
                      Thay đổi video chính trang chủ (YouTube, Vimeo, MP4) và thêm danh sách các clip ngắn mở hộp / review
                    </p>
                  </div>

                  {videoSaved && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Đã cập nhật video chính của website thành công!
                    </div>
                  )}

                  {/* Main Video Settings */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 max-w-3xl">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Video className="w-4 h-4 text-rose-600" />
                      Video Giới Thiệu Chính (Showcase 16:9)
                    </h4>

                    <form onSubmit={handleSaveMainVideo} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Tiêu Đề Video Chính
                        </label>
                        <input
                          type="text"
                          value={mainVideoTitle}
                          onChange={(e) => setMainVideoTitle(e.target.value)}
                          placeholder="SEYOUL Collagen Jelly Mask – Official Presentation"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Đường Dẫn Video (URL)
                          </label>
                          <input
                            type="text"
                            value={mainVideoUrl}
                            onChange={(e) => setMainVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=... hoặc .mp4"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            Hỗ trợ YouTube, Vimeo, hoặc đường link file video trực tiếp (.mp4)
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Ảnh Bìa Thumbnail (Poster URL)
                          </label>
                          <input
                            type="url"
                            value={mainVideoPoster}
                            onChange={(e) => setMainVideoPoster(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                        </div>
                      </div>

                      {/* Video Live Preview */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Xem Trước Video Trực Tiếp:
                        </label>
                        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-md">
                          {mainVideoUrl.endsWith('.mp4') ? (
                            <video src={mainVideoUrl} controls className="w-full h-full object-contain" />
                          ) : (
                            <iframe
                              src={
                                mainVideoUrl.includes('watch?v=')
                                  ? `https://www.youtube.com/embed/${mainVideoUrl.split('watch?v=')[1]?.split('&')[0]}`
                                  : mainVideoUrl
                              }
                              title="Video Preview"
                              className="w-full h-full border-0"
                              allowFullScreen
                            ></iframe>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setMainVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-skin-care-product-being-applied-to-a-womans-cheek-41525-large.mp4')
                            }
                            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            🎬 Dùng video mẫu K-Beauty MP4
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Lưu Video Chính</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Short Video Clips / Reels List */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                      <span>Danh Sách Video Clips Phụ & Khách Hàng Review ({videos.length})</span>
                    </h4>

                    {/* Add Clip Form */}
                    <form onSubmit={handleAddVideoClip} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 text-rose-600" />
                        <span>Thêm Video Clip Mới</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Tiêu đề clip (vd: Khách hàng đắp mask qua đêm)"
                          value={newClip.title}
                          onChange={(e) => setNewClip({ ...newClip, title: e.target.value })}
                          required
                          className="px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Đường dẫn video (URL hoặc .mp4)"
                          value={newClip.url}
                          onChange={(e) => setNewClip({ ...newClip, url: e.target.value })}
                          required
                          className="px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Thời lượng (vd: 0:30)"
                            value={newClip.duration}
                            onChange={(e) => setNewClip({ ...newClip, duration: e.target.value })}
                            className="w-24 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                          <button
                            type="submit"
                            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
                          >
                            Thêm Clip
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Clips List */}
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                      {videos.map((vid) => (
                        <div key={vid.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                              <Film className="w-4 h-4 text-sky-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-xs text-slate-900">
                                  {vid.title}
                                </h5>
                                {vid.isMain && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    Video Chính
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 truncate max-w-sm sm:max-w-md">
                                {vid.url}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!vid.isMain && (
                              <button
                                onClick={() => setMainVideo(vid.id)}
                                className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold cursor-pointer"
                              >
                                Đặt làm video chính
                              </button>
                            )}
                            {videos.length > 1 && (
                              <button
                                onClick={() => deleteVideo(vid.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                title="Xóa video clip này"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: REVIEWS MANAGEMENT */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-900">
                        Kiểm Duyệt Đánh Giá Khách Hàng (Reviews)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Phê duyệt đánh giá để hiển thị trên website hoặc xóa những phản hồi không phù hợp
                      </p>
                    </div>
                    <span className="text-xs text-slate-600">
                      Tổng số: <strong>{reviews.length} đánh giá</strong>
                    </span>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          r.approved ? 'border-slate-200 bg-white' : 'border-amber-300 bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{r.author}</span>
                              <span className="text-xs text-slate-400">({r.city})</span>
                              {r.verified && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">
                                  Đã mua hàng
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  r.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {r.approved ? 'Đã duyệt' : 'Chờ kiểm duyệt'}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-amber-400 text-xs">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>

                            <h5 className="font-bold text-xs text-slate-800 pt-1">
                              {r.title}
                            </h5>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {r.content}
                            </p>
                            <span className="text-[10px] text-slate-400 block pt-1">{r.date}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {!r.approved ? (
                              <button
                                onClick={() => approveReview(r.id)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Duyệt</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => deleteReview(r.id)}
                                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Gỡ bỏ</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SHIPPING MANAGEMENT */}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Cấu Hình Đơn Vị Vận Chuyển & Cước Phí
                    </h3>
                    <p className="text-xs text-slate-500">
                      Bật/tắt các hãng vận chuyển tại Séc & EU (Zásilkovna, PPL, DPD, GLS) và điều chỉnh cước phí
                    </p>
                  </div>

                  <div className="space-y-3">
                    {shippingMethods.map((s) => (
                      <div
                        key={s.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{s.name}</span>
                            {s.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                                {s.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{s.description}</p>
                          <span className="text-[11px] text-slate-400">
                            Thời gian giao hàng dự kiến: <strong>{s.estimatedDelivery}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={s.priceCZK}
                              onChange={(e) => updateShippingMethod(s.id, Number(e.target.value), s.enabled)}
                              className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-right"
                            />
                            <span className="text-xs text-slate-600 font-semibold">Kč</span>
                          </div>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={s.enabled}
                              onChange={(e) => updateShippingMethod(s.id, s.priceCZK, e.target.checked)}
                              className="w-4 h-4 rounded text-sky-600"
                            />
                            <span className="text-xs font-semibold text-slate-700">
                              {s.enabled ? 'Đang mở' : 'Tạm tắt'}
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: DISCOUNT CODES */}
              {activeTab === 'discounts' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Mã Giảm Giá Khuyến Mãi (Vouchers)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tạo mã code giảm giá để khách hàng nhập trong giỏ hàng (ví dụ: KOREA10)
                    </p>
                  </div>

                  {/* Create New Code */}
                  <form onSubmit={handleAddDiscount} className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mã Code
                      </label>
                      <input
                        type="text"
                        placeholder="vd: SEYOUL20"
                        value={newCode.code}
                        onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phần Trăm Giảm (%)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={newCode.discountPercent}
                        onChange={(e) => setNewCode({ ...newCode, discountPercent: Number(e.target.value) })}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mô Tả Mã
                      </label>
                      <input
                        type="text"
                        placeholder="vd: Giảm 20% cho khách VIP"
                        value={newCode.description}
                        onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md cursor-pointer"
                    >
                      Tạo Mã Mới
                    </button>
                  </form>

                  {/* List of Discounts */}
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {discountCodes.map((d) => (
                      <div key={d.code} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                              {d.code}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                              Giảm {d.discountPercent}%
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{d.description}</p>
                        </div>

                        <button
                          onClick={() => deleteDiscountCode(d.code)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa mã</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 9: SYSTEM SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Cài Đặt Hệ Thống & Cửa Hàng
                    </h3>
                    <p className="text-xs text-slate-500">
                      Điều chỉnh chính sách freeship, tỷ giá EUR, số lượng tồn kho và thông số vận hành
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                      <label className="block text-xs font-semibold text-slate-700">
                        Ngưỡng Miễn Phí Vận Chuyển Toàn Quốc (CZK)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={settings.freeShippingThresholdCZK}
                          onChange={(e) => updateSettings({ freeShippingThresholdCZK: Number(e.target.value) })}
                          className="w-32 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                        <span className="text-xs text-slate-500">
                          Kč (Đơn hàng từ mức này trở lên sẽ tự động miễn phí giao hàng)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                      <label className="block text-xs font-semibold text-slate-700">
                        Tỷ Giá Quy Đổi (1 EUR = ? CZK)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={settings.exchangeRateCZKtoEUR}
                          onChange={(e) => updateSettings({ exchangeRateCZKtoEUR: Number(e.target.value) })}
                          className="w-32 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                        <span className="text-xs text-slate-500">
                          CZK / EUR (Dùng để tính giá EUR cho khách tại các nước EU)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                      <label className="block text-xs font-semibold text-slate-700">
                        Số Lượng Tồn Kho Hiển Thị (Hộp)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={settings.stockCount}
                          onChange={(e) => updateSettings({ stockCount: Number(e.target.value) })}
                          className="w-32 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                        <span className="text-xs text-slate-500">
                          Hộp có sẵn trong kho Praha
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Trạng Thái Mở Cửa Hàng Bán Hàng
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Cho phép khách hàng tiếp tục tạo đơn hàng và thanh toán trực tuyến
                        </p>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.isStoreOpen}
                          onChange={(e) => updateSettings({ isStoreOpen: e.target.checked })}
                          className="w-5 h-5 rounded text-sky-600"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          {settings.isStoreOpen ? 'Đang hoạt động' : 'Tạm dừng'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Details Invoice Modal */}
        {inspectOrder && (
          <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Chi Tiết Đơn Hàng #{inspectOrder.orderNumber}
                  </h4>
                  <span className="text-xs text-slate-400">{inspectOrder.createdAt}</span>
                </div>
                <button
                  onClick={() => setInspectOrder(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <div className="font-semibold text-slate-900">
                    {inspectOrder.customer.firstName} {inspectOrder.customer.lastName}
                  </div>
                  <div>SĐT: {inspectOrder.customer.phone}</div>
                  <div>Email: {inspectOrder.customer.email}</div>
                  <div>Địa chỉ: {inspectOrder.customer.street}, {inspectOrder.customer.city}, {inspectOrder.customer.postalCode}</div>
                  <div className="text-sky-700 font-medium">Hãng vận chuyển: {inspectOrder.shippingMethod.name}</div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Sản phẩm:
                  </div>
                  {inspectOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span>{it.quantity}x {it.variantName}</span>
                      <span className="font-semibold">{formatPrice(it.priceCZK * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 pt-2 border-t text-slate-600">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(inspectOrder.subtotalCZK)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí ship:</span>
                    <span>{inspectOrder.shippingCZK === 0 ? 'Miễn phí' : formatPrice(inspectOrder.shippingCZK)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t">
                    <span>Tổng thanh toán:</span>
                    <span className="text-sky-700">{formatPrice(inspectOrder.totalCZK, inspectOrder.totalEUR)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setInspectOrder(null)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                >
                  Đóng Hóa Đơn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
