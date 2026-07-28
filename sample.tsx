import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ChevronRight, ArrowLeft, Check, X, 
  Home, Car, Maximize, Layout, Zap, Star, CheckCircle2, 
  Settings2, Building2, Info, DollarSign, Clock, Map, 
  Percent, Moon, Sun, Edit3, Save, Compass, Database,
  Image as ImageIcon, LayoutTemplate, Camera
} from 'lucide-react';

 ============================================================================
 [Supabase 串接預留區]
 1. 請在您的專案中安裝 npm install @supabasesupabase-js
 2. 解開下方的註解，並填入您的 API Keys
 ============================================================================
 import { createClient } from '@supabasesupabase-js';
 const SUPABASE_URL = 'httpsyour-project-id.supabase.co';
 const SUPABASE_KEY = 'your-anon-key';
 const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

 ============================================================================
 台灣縣市與行政區對應資料表 (用於下拉選單連動)
 ============================================================================
const TAIWAN_REGIONS = {
  '台北市' ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
  '新北市' ['板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '土城區', '蘆洲區', '樹林區', '汐止區', '鶯歌區', '三峽區', '淡水區', '瑞芳區', '五股區', '泰山區', '林口區', '深坑區', '石碇區', '坪林區', '三芝區', '石門區', '八里區', '平溪區', '雙溪區', '貢寮區', '金山區', '萬里區', '烏來區'],
  '桃園市' ['桃園區', '中壢區', '大溪區', '楊梅區', '蘆竹區', '大園區', '龜山區', '八德區', '龍潭區', '平鎮區', '新屋區', '觀音區', '復興區'],
  '台中市' ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '和平區', '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'],
  '台南市' ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'],
  '高雄市' ['楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '旗津區', '小港區', '鳳山區', '林園區', '大寮區', '大樹區', '大社區', '仁武區', '鳥松區', '岡山區', '橋頭區', '燕巢區', '田寮區', '阿蓮區', '路竹區', '湖內區', '茄萣區', '永安區', '彌陀區', '梓官區', '旗山區', '美濃區', '六龜區', '甲仙區', '杉林區', '內門區', '茂林區', '桃源區', '那瑪夏區'],
  '基隆市' ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '新竹市' ['東區', '北區', '香山區'],
  '新竹縣' ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉', '芎林鄉', '橫山鄉', '北埔鄉', '寶山鄉', '峨眉鄉', '尖石鄉', '五峰鄉'],
  '苗栗縣' ['苗栗市', '苑裡鎮', '通霄鎮', '竹南鎮', '頭份市', '後龍鎮', '卓蘭鎮', '大湖鄉', '公館鄉', '銅鑼鄉', '南庄鄉', '頭屋鄉', '三義鄉', '西湖鄉', '造橋鄉', '三灣鄉', '獅潭鄉', '泰安鄉'],
  '彰化縣' ['彰化市', '鹿港鎮', '和美鎮', '線西鄉', '伸港鄉', '福興鄉', '秀水鄉', '花壇鄉', '芬園鄉', '員林市', '溪湖鎮', '田中鎮', '大村鄉', '埔鹽鄉', '埔心鄉', '永靖鄉', '社頭鄉', '二水鄉', '北斗鎮', '二林鎮', '田尾鄉', '埤頭鄉', '芳苑鄉', '大城鄉', '竹塘鄉', '溪州鄉'],
  '南投縣' ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
  '雲林縣' ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '二崙鄉', '崙背鄉', '麥寮鄉', '東勢鄉', '褒忠鄉', '臺西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'],
  '嘉義市' ['東區', '西區'],
  '嘉義縣' ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
  '屏東縣' ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '三地門鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'],
  '宜蘭縣' ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
  '花蓮縣' ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'],
  '台東縣' ['臺東市', '成功鎮', '關山鎮', '卑南鄉', '大武鄉', '太麻里鄉', '東河鄉', '長濱鄉', '鹿野鄉', '池上鄉', '綠島鄉', '延平鄉', '海端鄉', '達仁鄉', '金峰鄉', '蘭嶼鄉']
};

 
  💡 Supabase 資料表建立建議 (Table properties)
  id uuid (Primary Key)
  city, district, address, community, unit, buildingType text
  totalPrice, totalPing, indoorPing, parkingPing, houseAge, publicRatio, managementFee numeric
  layoutRooms, layoutHalls, layoutBaths, layoutBalconies int2
  parking, landZoning text
  evCharging boolean
  score int2
  conditions jsonb  (直接儲存整個條件物件)
  transactions jsonb (直接儲存實價登錄陣列)
  coverImage, floorPlanImage text
  roomImages jsonb
  created_at timestampz


const DEFAULT_CONDITIONS = {
  mustHaves [
    { id 'm1', text '主客衛浴皆開窗', checked false },
    { id 'm2', text '客廳非暗廳 (有直接採光)', checked false },
    { id 'm3', text '1km 內無嫌惡設施 (宮廟高壓電塔福地)', checked false },
    { id 'm4', text '單層戶數電梯比在 31 內', checked false },
    { id 'm5', text '無明顯壁刀、路沖等風水瑕疵', checked false },
    { id 'm6', text '室內格局方正，無過多走道空間', checked false },
    { id 'm7', text '垃圾集中處理 (免追垃圾車)', checked false },
  ],
  niceToHaves [
    { id 'n1', text '有預留電動車充電樁管線設備', checked false },
    { id 'n2', text '步行 10 分鐘內有捷運火車站', checked false },
    { id 'n3', text '雙面或三面採光', checked false },
    { id 'n4', text '有前陽台 (景觀陽台)', checked false },
    { id 'n5', text '社區公設實用 (如健身房、收發室)', checked false },
    { id 'n6', text '學區優良', checked false },
  ]
};

const INITIAL_FORM_STATE = {
  city '台北市', district '中正區', address '', community '', unit '', parking '無', evCharging false,
  layoutRooms 3, layoutHalls 2, layoutBaths 2, layoutBalconies 1, buildingType '電梯大樓',
  totalPrice '', totalPing '', indoorPing '', parkingPing '',
  publicRatio '', managementFee '', houseAge '', landZoning '住宅區',
  coverImage '', floorPlanImage '', roomImages []
};

export default function HouseHunterApp() {
  const [currentView, setCurrentView] = useState('list');
  const [properties, setProperties] = useState([]);
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [globalConditionsTemplate, setGlobalConditionsTemplate] = useState(DEFAULT_CONDITIONS);
  const [newMustHave, setNewMustHave] = useState('');
  const [newNiceToHave, setNewNiceToHave] = useState('');
  const [txForm, setTxForm] = useState({ date '', floor '', totalPrice '', unitPrice '' });
  const [formMode, setFormMode] = useState(null); 
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  
   新增空間圖片的暫存狀態
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomUrl, setNewRoomUrl] = useState('');
  
   刪除確認與圖片放大狀態
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const generateId = () = Math.random().toString(36).substr(2, 9);

  useEffect(() = {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

   ============================================================================
   [資料層 API 封裝 (CRUD)] - 未來只需在這裡替換為 Supabase 邏輯
   ============================================================================

  const fetchProperties = async () = {
    setIsLoading(true);
    try {
       --- Supabase 實作範例 ---
       const { data, error } = await supabase.from('properties').select('').order('created_at', { ascending false });
       if (error) throw error;
       setProperties(data  []);
       ---------------------
    } catch (error) {
      console.error('載入資料失敗', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePropertyAsync = async (propertyData, mode) = {
    try {
      if (mode === 'add') {
        const newProp = {
          ...propertyData,
          id generateId(), 
          dateAdded new Date().toLocaleDateString(),
          conditions JSON.parse(JSON.stringify(globalConditionsTemplate)),
          score 0,
          transactions [] 
        };
         --- Supabase 實作範例 ---
         const { error } = await supabase.from('properties').insert([newProp]);
         if (error) throw error;
         ---------------------
        setProperties(prev = [newProp, ...prev]);
      } else {
         --- Supabase 實作範例 ---
         const { error } = await supabase.from('properties').update(propertyData).eq('id', propertyData.id);
         if (error) throw error;
         ---------------------
        setProperties(prev = prev.map(prop = prop.id === propertyData.id  { ...prop, ...propertyData }  prop));
      }
    } catch (error) {
      console.error('儲存失敗', error);
    }
  };

  const confirmDeleteProperty = async () = {
    if (!propertyToDelete) return;
    const id = propertyToDelete;
    try {
       --- Supabase 實作範例 ---
       const { error } = await supabase.from('properties').delete().eq('id', id);
       if (error) throw error;
       ---------------------
      
      setProperties(prevProps = prevProps.filter(p = p.id !== id));
      if (activePropertyId === id) {
        setCurrentView('list');
        setActivePropertyId(null);
      }
    } catch (error) {
      console.error('刪除失敗', error);
    } finally {
      setPropertyToDelete(null);
    }
  };

  const updatePropertySpecificDataAsync = async (id, updatedFields) = {
    try {
       --- Supabase 實作範例 ---
       const { error } = await supabase.from('properties').update(updatedFields).eq('id', id);
       if (error) throw error;
       ---------------------
      setProperties(prevProps = prevProps.map(prop = prop.id === id  { ...prop, ...updatedFields }  prop));
    } catch (error) {
      console.error('更新失敗', error);
    }
  };

   ============================================================================
   UI 事件處理器
   ============================================================================

  const handleSaveProperty = (e) = {
    e.preventDefault();
    if (!formData.community  !formData.unit) return;
    savePropertyAsync(formData, formMode);
    setFormMode(null);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleDeleteProperty = (id, e) = {
    e.stopPropagation();
    setPropertyToDelete(id);
  };

  const handleAddTransaction = (propertyId, e) = {
    e.preventDefault();
    if (!txForm.date  !txForm.totalPrice) return;
    
    const prop = properties.find(p = p.id === propertyId);
    if(!prop) return;

    const newTx = { id generateId(), ...txForm };
    const updatedTransactions = [newTx, ...(prop.transactions  [])];
    
    updatePropertySpecificDataAsync(propertyId, { transactions updatedTransactions });
    setTxForm({ date '', floor '', totalPrice '', unitPrice '' });
  };

  const handleDeleteTransaction = (propertyId, txId) = {
    const prop = properties.find(p = p.id === propertyId);
    if(!prop) return;

    const updatedTransactions = (prop.transactions  []).filter(t = t.id !== txId);
    updatePropertySpecificDataAsync(propertyId, { transactions updatedTransactions });
  };

  const calculateScore = (conditions) = {
    const mustHaveCount = conditions.mustHaves.length;
    const mustHaveChecked = conditions.mustHaves.filter(c = c.checked).length;
    const niceToHaveCount = conditions.niceToHaves.length;
    const niceToHaveChecked = conditions.niceToHaves.filter(c = c.checked).length;

    let mustHaveScore = mustHaveCount  0  (mustHaveChecked  mustHaveCount)  70  0;
    let niceToHaveScore = niceToHaveCount  0  (niceToHaveChecked  niceToHaveCount)  30  0;
    return Math.round(mustHaveScore + niceToHaveScore);
  };

  const toggleCondition = (propertyId, type, conditionId) = {
    const prop = properties.find(p = p.id === propertyId);
    if(!prop) return;

    const updatedConditions = JSON.parse(JSON.stringify(prop.conditions)); 
    updatedConditions[type] = updatedConditions[type].map(c = 
      c.id === conditionId  { ...c, checked !c.checked }  c
    );
    
    const newScore = calculateScore(updatedConditions);
    updatePropertySpecificDataAsync(propertyId, { conditions updatedConditions, score newScore });
  };

  const addGlobalCondition = (type, text) = {
    if (!text.trim()) return;
    setGlobalConditionsTemplate(prev = ({
      ...prev, [type] [...prev[type], { id generateId(), text, checked false }]
    }));
  };

  const deleteGlobalCondition = (type, conditionId) = {
    setGlobalConditionsTemplate(prev = ({
      ...prev, [type] prev[type].filter(c = c.id !== conditionId)
    }));
  };

  const openAddForm = () = { setFormData(INITIAL_FORM_STATE); setFormMode('add'); };
  const openEditForm = (property) = { setFormData({ ...property }); setFormMode('edit'); };

   ============================================================================
   畫面渲染區塊
   ============================================================================

  const renderForm = () = (
    div className=bg-white darkbg-slate-800 p-5 rounded-3xl shadow-lg border border-slate-100 darkborder-slate-700 animate-in fade-in zoom-in-95 duration-300 relative z-50
      div className=flex justify-between items-center mb-6 pb-4 border-b darkborder-slate-700
        h3 className=font-bold text-xl text-slate-800 darktext-white flex items-center gap-2
          {formMode === 'add'  Plus size={24} className=text-blue-500  Edit3 size={24} className=text-amber-500}
          {formMode === 'add'  '建立看屋筆記'  '編輯物件資訊'}
        h3
        button onClick={(e) = { e.preventDefault(); e.stopPropagation(); setFormMode(null); }} className=p-2 bg-slate-100 darkbg-slate-700 text-slate-500 darktext-slate-300 rounded-full hoverbg-slate-200 darkhoverbg-slate-600 transition-colors
          X size={20} 
        button
      div
      
      form onSubmit={handleSaveProperty} className=space-y-6
        div className=bg-slate-50 darkbg-slate-90050 p-4 rounded-2xl border border-slate-100 darkborder-slate-700 space-y-4
          div className=flex items-center justify-between
             h4 className=text-sm font-bold text-slate-500 darktext-slate-400 flex items-center gap-2Map size={16} 地點與社區資訊h4
             span className=text-[10px] bg-blue-100 darkbg-blue-90050 text-blue-600 darktext-blue-400 px-2 py-1 rounded-md必填項目span
          div
          
          div className=grid grid-cols-2 mdgrid-cols-4 gap-4
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5縣市 label
              select required className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.city} 
                onChange={e = {
                  const newCity = e.target.value;
                   當縣市改變時，自動將行政區設定為該縣市的第一個區，避免不匹配
                  setFormData({...formData, city newCity, district TAIWAN_REGIONS[newCity][0]});
                }}
                {Object.keys(TAIWAN_REGIONS).map(city = option key={city} value={city}{city}option)}
              select
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5行政區 label
              select required className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.district} 
                onChange={e = setFormData({...formData, district e.target.value})}
                {TAIWAN_REGIONS[formData.city].map(dist = option key={dist} value={dist}{dist}option)}
              select
            div
            div className=mdcol-span-2
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5路段地址label
              input type=text className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.address} onChange={e = setFormData({...formData, address e.target.value})} placeholder=例 信義路五段7號 
            div
          div

          div className=grid grid-cols-1 mdgrid-cols-3 gap-4 pt-2
            div className=mdcol-span-2
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5社區建案名稱 label
              input required type=text className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.community} onChange={e = setFormData({...formData, community e.target.value})} placeholder=例如：藍天白雲社區 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5建物型態label
              select className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.buildingType} onChange={e = setFormData({...formData, buildingType e.target.value})}
                option value=電梯大樓電梯大樓optionoption value=華廈華廈 (10樓內有電梯)optionoption value=公寓公寓 (無電梯)optionoption value=透天厝透天厝option
              select
            div
          div
        div

        div className=bg-slate-50 darkbg-slate-90050 p-4 rounded-2xl border border-slate-100 darkborder-slate-700 space-y-4
          h4 className=text-sm font-bold text-slate-500 darktext-slate-400 flex items-center gap-2Building2 size={16} 房屋與售價資訊h4
          div className=grid grid-cols-1 mdgrid-cols-4 gap-4
            div className=mdcol-span-2
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5棟別戶別樓層 label
              input required type=text className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.unit} onChange={e = setFormData({...formData, unit e.target.value})} placeholder=例如：A棟 5F 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5總價 (萬)label
              input type=number className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.totalPrice} onChange={e = setFormData({...formData, totalPrice e.target.value})} placeholder=1580 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5屋齡 (年)label
              input type=number step=0.1 className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.houseAge} onChange={e = setFormData({...formData, houseAge e.target.value})} placeholder=5.5 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5土地分區label
              select className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.landZoning} onChange={e = setFormData({...formData, landZoning e.target.value})}
                option value=住宅區住宅區optionoption value=商業區商業區optionoption value=工業區工業區optionoption value=農業區農業區optionoption value=其他其他option
              select
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5權狀坪數label
              input type=number step=0.01 className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.totalPing} onChange={e = setFormData({...formData, totalPing e.target.value})} 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5主+附室內label
              input type=number step=0.01 className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.indoorPing} onChange={e = setFormData({...formData, indoorPing e.target.value})} 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5公設比 (%)label
              input type=number step=0.1 className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.publicRatio} onChange={e = setFormData({...formData, publicRatio e.target.value})} 
            div
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5管理費 (月)label
              input type=number className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                value={formData.managementFee} onChange={e = setFormData({...formData, managementFee e.target.value})} 
            div
          div
        div

        div className=bg-slate-50 darkbg-slate-90050 p-4 rounded-2xl border border-slate-100 darkborder-slate-700 space-y-4
          h4 className=text-sm font-bold text-slate-500 darktext-slate-400 flex items-center gap-2Layout size={16} 格局與車位h4
          div className=grid grid-cols-1 mdgrid-cols-2 gap-6
            div
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-2室內格局label
              div className=flex flex-wrap gap-2 items-center
                div className=flex items-center gap-1.5input type=number min=0 max=10 className=w-14 p-2 text-sm text-center bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-lg darktext-white value={formData.layoutRooms} onChange={e = setFormData({...formData, layoutRooms parseInt(e.target.value)  0})} span className=text-sm darktext-slate-300房spandiv
                div className=flex items-center gap-1.5input type=number min=0 max=5 className=w-14 p-2 text-sm text-center bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-lg darktext-white value={formData.layoutHalls} onChange={e = setFormData({...formData, layoutHalls parseInt(e.target.value)  0})} span className=text-sm darktext-slate-300廳spandiv
                div className=flex items-center gap-1.5input type=number min=0 max=5 className=w-14 p-2 text-sm text-center bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-lg darktext-white value={formData.layoutBaths} onChange={e = setFormData({...formData, layoutBaths parseInt(e.target.value)  0})} span className=text-sm darktext-slate-300衛spandiv
                div className=flex items-center gap-1.5input type=number min=0 max=5 className=w-14 p-2 text-sm text-center bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-lg darktext-white value={formData.layoutBalconies} onChange={e = setFormData({...formData, layoutBalconies parseInt(e.target.value)  0})} span className=text-sm darktext-slate-300陽台spandiv
              div
            div
            
            div className=grid grid-cols-2 gap-4
              div
                label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5車位類型label
                select className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                  value={formData.parking} onChange={e = setFormData({...formData, parking e.target.value})}
                  option value=無無車位optionoption value=坡道平面坡平optionoption value=坡道機械坡機optionoption value=升降平面升平optionoption value=升降機械升機optionoption value=其他其他option
                select
              div
              div
                label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5車位坪數label
                input type=number step=0.01 className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                  value={formData.parkingPing} onChange={e = setFormData({...formData, parkingPing e.target.value})} 
              div
            div
            
            div className=mdcol-span-2 pt-2 border-t darkborder-slate-700 mt-2
              label className=flex items-center cursor-pointer p-2 hoverbg-slate-100 darkhoverbg-slate-800 rounded-xl transition-colors w-max
                input type=checkbox className=sr-only peer checked={formData.evCharging} onChange={e = setFormData({...formData, evCharging e.target.checked})} 
                div className=w-11 h-6 bg-slate-300 darkbg-slate-600 peer-focusoutline-none rounded-full peer peer-checkedaftertranslate-x-full peer-checkedafterborder-white aftercontent-[''] afterabsolute aftertop-[2px] afterleft-[2px] afterbg-white afterborder-gray-300 afterborder afterrounded-full afterh-5 afterw-5 aftertransition-all peer-checkedbg-indigo-500div
                span className=ml-3 text-sm font-medium text-slate-700 darktext-slate-200 flex items-center gap-1.5
                  Zap size={16} className={formData.evCharging  'text-amber-400'  'text-slate-400'}  具備電動車充電樁  預留管線
                span
              label
            div
          div
        div

        div className=bg-slate-50 darkbg-slate-90050 p-4 rounded-2xl border border-slate-100 darkborder-slate-700 space-y-4
          h4 className=text-sm font-bold text-slate-500 darktext-slate-400 flex items-center gap-2ImageIcon size={16} 相關圖片連結 (網路圖片 URL)h4
          div className=space-y-4
            div className=grid grid-cols-1 mdgrid-cols-2 gap-4
              div
                label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5社區封面圖 (URL)label
                input type=url className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                  value={formData.coverImage  ''} onChange={e = setFormData({...formData, coverImage e.target.value})} placeholder=httpsexample.comcover.jpg 
              div
              div
                label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-1.5室內格局圖 (URL)label
                input type=url className=w-full p-2.5 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white transition-all shadow-sm
                  value={formData.floorPlanImage  ''} onChange={e = setFormData({...formData, floorPlanImage e.target.value})} placeholder=httpsexample.comfloor.jpg 
              div
            div
            
            div className=border-t darkborder-slate-700 pt-4 mt-2
              label className=block text-xs font-medium text-slate-700 darktext-slate-300 mb-2動態新增各空間圖片 (輸入名稱與網址)label
              div className=flex gap-2 mb-3
                input type=text value={newRoomName} onChange={e = setNewRoomName(e.target.value)} placeholder=名稱 (如 主臥室) className=w-13 p-2 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white 
                input type=url value={newRoomUrl} onChange={e = setNewRoomUrl(e.target.value)} placeholder=圖片網址 (URL) className=flex-grow p-2 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-blue-500 outline-none darktext-white 
                button type=button onClick={(e) = {
                  e.preventDefault();
                  if (!newRoomName  !newRoomUrl) return;
                  setFormData(prev = ({...prev, roomImages [...(prev.roomImages  []), { id generateId(), name newRoomName, url newRoomUrl }]}));
                  setNewRoomName(''); setNewRoomUrl('');
                }} className=bg-slate-200 darkbg-slate-700 hoverbg-slate-300 darkhoverbg-slate-600 text-slate-700 darktext-slate-200 px-3 py-2 rounded-xl transition-colors shrink-0
                  Plus size={18} 
                button
              div
              
              {formData.roomImages && formData.roomImages.length  0 && (
                div className=grid grid-cols-2 smgrid-cols-3 gap-2
                  {formData.roomImages.map(img = (
                    div key={img.id} className=flex items-center justify-between bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 p-1.5 rounded-lg group hoverborder-blue-300 transition-colors
                      div className=flex items-center gap-2 overflow-hidden
                        img src={img.url} alt={img.name} className=w-8 h-8 object-cover rounded-md bg-slate-100 loading=lazy 
                        span className=text-xs font-medium darktext-slate-200 truncate{img.name}span
                      div
                      button type=button onClick={() = setFormData(prev = ({...prev, roomImages prev.roomImages.filter(i = i.id !== img.id)}))} className=text-red-500 p-1 hoverbg-red-50 darkhoverbg-red-90030 rounded-md opacity-50 group-hoveropacity-100 transition-opacity
                        X size={14} 
                      button
                    div
                  ))}
                div
              )}
            div
          div
        div

        div className=pt-4 flex justify-end gap-3 border-t darkborder-slate-700
          button type=button onClick={() = setFormMode(null)} className=px-5 py-2.5 text-slate-600 darktext-slate-300 bg-slate-100 darkbg-slate-700 hoverbg-slate-200 darkhoverbg-slate-600 rounded-xl transition-all font-medium取消button
          button type=submit className=px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hoverfrom-blue-700 hoverto-indigo-700 text-white rounded-xl transition-all shadow-md shadow-blue-50030 flex items-center gap-2 font-medium
            Save size={18}  {formMode === 'add'  '建立筆記'  '儲存修改'}
          button
        div
      form
    div
  );

  const renderListView = () = (
    div className=max-w-3xl mx-auto p-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen
      div className=flex justify-between items-center mb-8 sticky top-0 z-20 bg-slate-5080 darkbg-slate-90080 backdrop-blur-xl py-3 rounded-2xl px-4 border border-slate-20050 darkborder-slate-70050 shadow-sm
        h1 className=text-xl smtext-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent flex items-center gap-2
          Home size={24} className=text-blue-600 smw-7 smh-7  span className=hidden sminline看屋筆記span
        h1
        div className=flex items-center gap-1.5 smgap-2
          {!formMode && (
            button onClick={openAddForm} className=px-3 py-2 smpx-4 smpy-2.5 bg-blue-600 hoverbg-blue-700 text-white rounded-xl shadow-md shadow-blue-50030 transition-colors flex items-center gap-1.5 font-bold text-sm
              Plus size={18}  span className=hidden sminline新增紀錄span
            button
          )}
          button onClick={() = setIsDarkMode(!isDarkMode)} className=p-2 smp-2.5 text-slate-600 darktext-slate-300 hoverbg-slate-200 darkhoverbg-slate-800 rounded-xl transition-colors title=切換深淺色
            {isDarkMode  Sun size={20}   Moon size={20} }
          button
          button onClick={() = setCurrentView('settings')} className=p-2 smp-2.5 text-slate-600 darktext-slate-300 hoverbg-slate-200 darkhoverbg-slate-800 rounded-xl transition-colors title=預設評分條件設定
            Settings2 size={20} 
          button
        div
      div

      {formMode && div className=mb-8{renderForm()}div}

      {!formMode && (
        div className=space-y-4
          {isLoading  (
            div className=text-center py-16 text-slate-400 darktext-slate-500載入中...div
          )  properties.length === 0  (
            div className=text-center py-16 text-slate-400 darktext-slate-500 flex flex-col items-center
              Compass size={64} strokeWidth={1} className=mb-4 opacity-50 
              p className=text-lg font-medium還沒有任何紀錄p
              p className=text-sm mt-1點擊上方按鈕開始您的看房之旅p
              div className=mt-8 px-4 py-3 bg-blue-50 darkbg-blue-90020 rounded-xl text-blue-600 darktext-blue-400 text-xs flex items-center gap-2
                Database size={16}  提示：程式碼已準備好 Supabase 串接架構
              div
            div
          )  (
            properties.map(prop = (
              div key={prop.id} onClick={() = { setActivePropertyId(prop.id); setCurrentView('detail'); }}
                className=bg-white darkbg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700 hovershadow-xl hoverborder-blue-200 darkhoverborder-slate-500 hover-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col smflex-row gap-4 relative overflow-hidden
              
                div className={`absolute left-0 top-0 bottom-0 w-2 transition-colors z-10 ${
                  prop.score = 80  'bg-emerald-500'  prop.score = 60  'bg-blue-500'  prop.score  0  'bg-amber-500'  'bg-slate-300 darkbg-slate-600'
                }`}div

                {prop.coverImage && (
                  
                    div className=hidden smblock ml-1 w-36 h-32 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100 darkborder-slate-700 self-center bg-slate-100 darkbg-slate-900
                      img src={prop.coverImage} alt=封面 loading=lazy className=w-full h-full object-cover group-hoverscale-110 transition-transform duration-700 ease-out 
                    div
                    div className=smhidden w-[calc(100%+2.5rem)] h-40 shrink-0 overflow-hidden -mt-5 -ml-5 -mr-5 mb-1 relative border-b border-slate-100 darkborder-slate-700 bg-slate-100 darkbg-slate-900
                      img src={prop.coverImage} alt=封面 loading=lazy className=w-full h-full object-cover 
                      div className=absolute inset-0 bg-gradient-to-t from-slate-90040 to-transparentdiv
                    div
                  
                )}

                div className={`pl-3 flex-grow ${prop.coverImage  'mt-1 smmt-0'  ''}`}
                  div className=flex justify-between items-start mb-3
                    div
                      div className=flex items-center gap-2 mb-1
                        span className=text-[10px] bg-slate-200 darkbg-slate-700 text-slate-600 darktext-slate-300 px-2 py-0.5 rounded-full font-bold
                          {prop.city} {prop.district}
                        span
                      div
                      h3 className=text-xl font-bold text-slate-800 darktext-white flex items-center gap-2
                        {prop.community}
                      h3
                      div className=text-slate-500 darktext-slate-400 font-medium text-sm mt-1{prop.unit}div
                    div
                    div className=hidden smflex flex-col items-center justify-center bg-slate-50 darkbg-slate-900 border border-slate-100 darkborder-slate-700 rounded-2xl p-2.5 min-w-[70px] shadow-sm
                      span className={`text-2xl font-black leading-none ${
                        prop.score = 80  'text-emerald-500'  prop.score = 60  'text-blue-500'  prop.score  0  'text-amber-500'  'text-slate-400'
                      }`}{prop.score}span
                      span className=text-[10px] text-slate-400 uppercase tracking-wider mt-1 font-boldScorespan
                    div
                  div

                  div className=flex flex-wrap gap-2 text-xs font-medium
                    {prop.totalPrice && (
                      span className=flex items-center gap-1 bg-red-50 darkbg-red-90020 text-red-600 darktext-red-400 px-2.5 py-1.5 rounded-lg
                        DollarSign size={14}  {prop.totalPrice} 萬
                      span
                    )}
                    span className=flex items-center gap-1 bg-indigo-50 darkbg-indigo-90030 text-indigo-700 darktext-indigo-300 px-2.5 py-1.5 rounded-lg
                      Layout size={14}  {prop.layoutRooms}房 {prop.layoutHalls}廳 {prop.layoutBaths}衛
                    span
                    {prop.totalPing && (
                      span className=flex items-center gap-1 bg-slate-100 darkbg-slate-700 text-slate-700 darktext-slate-300 px-2.5 py-1.5 rounded-lg
                        Maximize size={14}  權狀 {prop.totalPing} 坪
                      span
                    )}
                    span className=flex items-center gap-1 bg-slate-100 darkbg-slate-700 text-slate-700 darktext-slate-300 px-2.5 py-1.5 rounded-lg
                      Car size={14}  {prop.parking}
                      {prop.evCharging && Zap size={14} className=text-amber-500 ml-0.5 }
                    span
                  div
                div

                div className=flex items-center gap-3 w-full smw-auto justify-between smjustify-end border-t darkborder-slate-700 smborder-t-0 pt-3 smpt-0
                   div className=smhidden flex items-center gap-2
                      span className=text-xs text-slate-500 darktext-slate-400 font-bold評分span
                      span className={`text-xl font-black ${
                        prop.score = 80  'text-emerald-500'  prop.score = 60  'text-blue-500'  prop.score  0  'text-amber-500'  'text-slate-400'
                      }`}{prop.score}span
                   div
                  div className=flex items-center gap-1 smgap-2
                    button onClick={(e) = { e.preventDefault(); e.stopPropagation(); openEditForm(prop); }} className=p-2 text-slate-400 hovertext-amber-500 hoverbg-amber-50 darkhoverbg-amber-90030 rounded-full transition-colors title=編輯
                      Edit3 size={18} 
                    button
                    button onClick={(e) = handleDeleteProperty(prop.id, e)} className=p-2 text-slate-400 hovertext-red-500 hoverbg-red-50 darkhoverbg-red-90030 rounded-full transition-colors relative z-10 title=刪除
                      Trash2 size={18} 
                    button
                    div className=w-8 h-8 rounded-full bg-slate-100 darkbg-slate-700 flex items-center justify-center group-hoverbg-blue-500 group-hovertext-white transition-colors text-slate-400 ml-1
                       ChevronRight size={18} 
                    div
                  div
                div
              div
            ))
          )}
        div
      )}
    div
  );

  const renderDetailView = () = {
    const prop = properties.find(p = p.id === activePropertyId);
    if (!prop) return null;

    if (formMode === 'edit') {
      return div className=max-w-3xl mx-auto p-4 pt-6 animate-in slide-in-from-bottom-8 duration-300{renderForm()}div;
    }

    const mustHaveTotal = prop.conditions.mustHaves.length;
    const mustHaveChecked = prop.conditions.mustHaves.filter(c = c.checked).length;
    const mustProgress = mustHaveTotal  (mustHaveChecked  mustHaveTotal)  100  0;

    const niceToHaveTotal = prop.conditions.niceToHaves.length;
    const niceToHaveChecked = prop.conditions.niceToHaves.filter(c = c.checked).length;
    const niceProgress = niceToHaveTotal  (niceToHaveChecked  niceToHaveTotal)  100  0;

    return (
      div className=max-w-3xl mx-auto pb-20 animate-in slide-in-from-right-8 duration-300 min-h-screen
        div className=sticky top-0 z-20 bg-slate-5080 darkbg-slate-90080 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-slate-20050 darkborder-slate-70050 shadow-sm
          button onClick={() = setCurrentView('list')} className=flex items-center gap-2 bg-white darkbg-slate-800 text-slate-700 darktext-slate-200 px-4 py-2 rounded-xl shadow-sm border border-slate-200 darkborder-slate-700 hoverbg-slate-50 darkhoverbg-slate-700 font-medium transition-colors
            ArrowLeft size={18}  返回
          button
          
          div className=flex items-center gap-2 smgap-3
             div className=flex items-center gap-2 mr-1 smmr-3
               span className=text-xs text-slate-500 darktext-slate-400 font-bold uppercase tracking-widest hidden smblockTotal Scorespan
               div className={`text-3xl font-black ${
                  prop.score = 80  'text-emerald-500'  prop.score = 60  'text-blue-500'  'text-slate-700 darktext-slate-300'
               }`}{prop.score}div
             div
             button onClick={() = openEditForm(prop)} className=p-2 smp-2.5 bg-blue-100 darkbg-blue-90040 text-blue-600 darktext-blue-400 hoverbg-blue-200 darkhoverbg-blue-80060 rounded-xl transition-colors shadow-sm title=編輯物件
               Edit3 size={20} 
             button
             button onClick={(e) = handleDeleteProperty(prop.id, e)} className=p-2 smp-2.5 bg-red-100 darkbg-red-90040 text-red-600 darktext-red-400 hoverbg-red-200 darkhoverbg-red-80060 rounded-xl transition-colors shadow-sm title=刪除物件
               Trash2 size={20} 
             button
          div
        div

        div className=p-4 space-y-6
          div className=bg-white darkbg-slate-800 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700 relative overflow-hidden
            
            {prop.coverImage && (
              div 
                 className=w-full h-48 smh-64 relative bg-slate-100 darkbg-slate-900 cursor-pointer group
                 onClick={() = setPreviewImage(prop.coverImage)}
              
                 img src={prop.coverImage} alt=封面 loading=lazy className=w-full h-full object-cover group-hoverscale-105 transition-transform duration-700 
                 div className=absolute inset-0 bg-gradient-to-t from-slate-90090 via-slate-90030 to-transparentdiv
                 div className=absolute bottom-5 left-6 right-6 pointer-events-none
                     h2 className=text-3xl font-black text-white mb-1 drop-shadow-lg relative z-10{prop.community}h2
                     p className=text-lg text-slate-200 font-medium relative z-10{prop.unit}p
                 div
                 div className=absolute top-4 right-4 bg-black40 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hoveropacity-100 transition-opacity
                    Maximize size={18} 
                 div
              div
            )}

            div className={`p-6 ${prop.coverImage  'pt-4'  ''}`}
              {!prop.coverImage && (
                
                  div className=absolute -top-24 -right-24 w-48 h-48 bg-blue-50010 darkbg-blue-50020 rounded-full blur-3xldiv
                  h2 className=text-3xl font-black text-slate-800 darktext-white mb-2 relative z-10{prop.community}h2
                  p className=text-lg text-slate-600 darktext-slate-300 font-medium mb-2 relative z-10{prop.unit}p
                
              )}
              
              div className=text-sm text-slate-500 darktext-slate-400 font-medium mb-6 relative z-10 flex items-center gap-1
                span className=font-bold text-slate-800 darktext-white text-lg{prop.totalPing  `${prop.totalPing} 坪`  '-'}span
              div
              
              div className=grid grid-cols-2 mdgrid-cols-4 gap-4 bg-slate-50 darkbg-slate-90050 p-4 rounded-2xl border border-slate-100 darkborder-slate-700
                div className=flex flex-col justify-center pl-2span className=text-[11px] text-slate-400 uppercase font-bold tracking-wider格局spanspan className=font-semibold text-slate-700 darktext-slate-300{prop.layoutRooms}房 {prop.layoutHalls}廳 {prop.layoutBaths}衛spandiv
              div className=flex flex-col justify-center pl-2span className=text-[11px] text-slate-400 uppercase font-bold tracking-wider管理費spanspan className=font-semibold text-slate-700 darktext-slate-300{prop.managementFee  `$${prop.managementFee}月`  '-'}spandiv
              div className=flex flex-col justify-center pl-2span className=text-[11px] text-slate-400 uppercase font-bold tracking-wider土地分區spanspan className=font-semibold text-slate-700 darktext-slate-300{prop.landZoning  '-'}spandiv

              div className=mdcol-span-4 bg-indigo-50 darkbg-indigo-90020 p-4 rounded-2xl border border-indigo-100 darkborder-indigo-80050 flex flex-col smflex-row smitems-center justify-between gap-4 mt-2
                 div className=flex flex-col
                   span className=text-xs text-indigo-500 darktext-indigo-400 font-bold mb-1 flex items-center gap-1Car size={14} 車位配置span
                   span className=font-bold text-indigo-900 darktext-indigo-200 text-lg flex items-center gap-2{prop.parking} {prop.parkingPing && span className=text-sm font-medium opacity-70({prop.parkingPing}坪)span}span
                 div
                 div className=flex items-center gap-2 bg-white60 darkbg-slate-80060 px-3 py-2 rounded-xl backdrop-blur-sm
                   Zap size={18} className={prop.evCharging  'text-amber-500'  'text-slate-400'}
                   span className={`text-sm font-bold ${prop.evCharging  'text-slate-800 darktext-white'  'text-slate-500 darktext-slate-400'}`}{prop.evCharging  '已規劃充電設施'  '無充電樁規劃'}span
                 div
              div
            div
          div
          div

          div className=bg-white darkbg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700 relative
             div className=flex flex-col smflex-row justify-between items-start smitems-center gap-4 mb-5
               h3 className=text-lg font-black text-slate-800 darktext-white flex items-center gap-2
                 DollarSign size={20} className=text-emerald-500 同社區參考行情 
                 span className=text-[10px] bg-emerald-100 darkbg-emerald-90050 text-emerald-600 darktext-emerald-400 px-2 py-0.5 rounded-md font-normal手動紀錄span
               h3
             div
             
             form onSubmit={(e) = handleAddTransaction(prop.id, e)} className=mb-4 bg-slate-50 darkbg-slate-90050 p-3 rounded-2xl border border-slate-100 darkborder-slate-700 flex flex-wrap smflex-nowrap gap-2 items-end
               div className=flex-1 min-w-[80px]
                 label className=block text-[10px] font-bold text-slate-500 darktext-slate-400 mb-1年月 (如 11208)label
                 input required type=text value={txForm.date} onChange={e = setTxForm({...txForm, date e.target.value})} className=w-full p-2 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-emerald-500 outline-none darktext-white placeholder=11208
               div
               div className=flex-1 min-w-[60px]
                 label className=block text-[10px] font-bold text-slate-500 darktext-slate-400 mb-1樓層label
                 input type=text value={txForm.floor} onChange={e = setTxForm({...txForm, floor e.target.value})} className=w-full p-2 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-emerald-500 outline-none darktext-white placeholder=5F
               div
               div className=flex-1 min-w-[80px]
                 label className=block text-[10px] font-bold text-slate-500 darktext-slate-400 mb-1總價(萬)label
                 input required type=number value={txForm.totalPrice} onChange={e = setTxForm({...txForm, totalPrice e.target.value})} className=w-full p-2 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-emerald-500 outline-none darktext-white placeholder=1580
               div
               div className=flex-1 min-w-[80px]
                 label className=block text-[10px] font-bold text-slate-500 darktext-slate-400 mb-1單價(萬坪)label
                 input type=number step=0.01 value={txForm.unitPrice} onChange={e = setTxForm({...txForm, unitPrice e.target.value})} className=w-full p-2 text-sm bg-white darkbg-slate-800 border border-slate-200 darkborder-slate-600 rounded-xl focusring-2 focusring-emerald-500 outline-none darktext-white placeholder=45.5
               div
               button type=submit className=w-full smw-auto p-2 bg-emerald-500 hoverbg-emerald-600 text-white rounded-xl transition-colors font-bold text-sm shadow-sm flex items-center justify-center gap-1
                 Plus size={16}  新增
               button
             form

             div className=overflow-x-auto rounded-xl border border-slate-100 darkborder-slate-700
               table className=w-full text-sm text-left
                 thead className=text-xs text-slate-500 darktext-slate-400 bg-slate-50 darkbg-slate-90050 uppercase
                   tr
                     th className=px-4 py-3 font-medium交易年月th
                     th className=px-4 py-3 font-medium樓層th
                     th className=px-4 py-3 font-medium text-right總價th
                     th className=px-4 py-3 font-medium text-right單價(萬坪)th
                     th className=px-4 py-3 font-medium text-center w-10th
                   tr
                 thead
                 tbody className=divide-y divide-slate-100 darkdivide-slate-70050
                   {!(prop.transactions && prop.transactions.length  0)  (
                     trtd colSpan=5 className=px-4 py-8 text-center text-slate-400目前沒有手動紀錄行情tdtr
                   )  (
                     prop.transactions.map(tx = (
                       tr key={tx.id} className=hoverbg-slate-50 darkhoverbg-slate-70020 transition-colors group
                         td className=px-4 py-3 text-slate-700 darktext-slate-300{tx.date}td
                         td className=px-4 py-3 text-slate-700 darktext-slate-300{tx.floor  '-'}td
                         td className=px-4 py-3 text-right font-bold text-red-500 darktext-red-400{tx.totalPrice}萬td
                         td className=px-4 py-3 text-right font-bold text-slate-800 darktext-slate-200{tx.unitPrice  '-'}td
                         td className=px-4 py-3 text-center
                           button onClick={() = handleDeleteTransaction(prop.id, tx.id)} className=text-slate-300 hovertext-red-500 hoverbg-red-50 darkhoverbg-red-90030 p-1.5 rounded-lg opacity-0 group-hoveropacity-100 transition-all
                             Trash2 size={16}
                           button
                         td
                       tr
                     ))
                   )}
                 tbody
               table
             div
          div

          {(prop.floorPlanImage  (prop.roomImages && prop.roomImages.length  0)) && (
            div className=bg-white darkbg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700
               h3 className=text-lg font-black text-slate-800 darktext-white flex items-center gap-2 mb-5
                 ImageIcon size={20} className=text-blue-500 屋況與格局照片
               h3
               
               div className=grid grid-cols-1 smgrid-cols-2 gap-4
                 {prop.floorPlanImage && (
                   div 
                     className=relative rounded-2xl overflow-hidden border border-slate-100 darkborder-slate-700 group h-56 smh-72 shadow-sm bg-slate-50 darkbg-slate-90050 cursor-pointer
                     onClick={() = setPreviewImage(prop.floorPlanImage)}
                   
                     img src={prop.floorPlanImage} alt=格局圖 loading=lazy className=w-full h-full object-contain p-2 group-hoverscale-[1.03] transition-transform duration-500 
                     div className=absolute top-2 left-2 bg-slate-90070 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm
                       LayoutTemplate size={14} className=text-blue-400 格局圖
                     div
                     div className=absolute inset-0 bg-black0 group-hoverbg-black10 transition-colors flex items-center justify-center
                        Maximize size={24} className=text-white opacity-0 group-hoveropacity-100 drop-shadow-md transition-opacity 
                     div
                   div
                 )}
                 
                 {prop.roomImages && prop.roomImages.map(img = (
                   div 
                     key={img.id} 
                     className=relative rounded-2xl overflow-hidden border border-slate-100 darkborder-slate-700 group h-56 smh-72 shadow-sm bg-slate-100 darkbg-slate-90050 cursor-pointer
                     onClick={() = setPreviewImage(img.url)}
                   
                     img src={img.url} alt={img.name} loading=lazy className=w-full h-full object-cover group-hoverscale-[1.05] transition-transform duration-500 
                     div className=absolute top-2 left-2 bg-slate-90070 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm
                       Camera size={14} className=text-amber-400 {img.name}
                     div
                     div className=absolute inset-0 bg-black0 group-hoverbg-black10 transition-colors flex items-center justify-center
                        Maximize size={24} className=text-white opacity-0 group-hoveropacity-100 drop-shadow-md transition-opacity 
                     div
                   div
                 ))}
               div
            div
          )}

          div className=flex items-center gap-2 text-sm text-slate-500 darktext-slate-400 px-2 mt-6
            Info size={16}  點擊下方項目進行評分，總分會自動計算 (必需 70%，加分 30%)
          div

          div className=bg-white darkbg-slate-800 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700 overflow-hidden
            div className=bg-gradient-to-r from-red-50 to-orange-50 darkfrom-red-90020 darkto-orange-90020 p-5 flex justify-between items-end border-b border-red-100 darkborder-red-90030
              divh3 className=text-xl font-black text-red-600 darktext-red-400 flex items-center gap-2Star size={20} className=fill-red-600 darkfill-red-400  必需項 (Must Have)h3div
              div className=text-right
                span className=text-3xl font-black text-red-600 darktext-red-400{mustHaveChecked}spanspan className=text-sm font-bold text-red-400 darktext-red-50070  {mustHaveTotal}span
              div
            div
            
            div className=w-full bg-slate-100 darkbg-slate-70050 h-2
              div className=bg-gradient-to-r from-red-500 to-orange-500 h-2 transition-all duration-700 ease-out style={{ width `${mustProgress}%` }}div
            div

            div className=p-2
              {prop.conditions.mustHaves.length === 0  (
                 p className=p-6 text-center text-slate-400尚未設定條件p
              )  (
                prop.conditions.mustHaves.map(condition = (
                  label key={condition.id} className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl transition-all m-1 hoverbg-slate-50 darkhoverbg-slate-70050 ${condition.checked  'bg-red-5050 darkbg-red-90010'  ''}`}
                    div className=relative flex items-start pt-1
                      input type=checkbox className=w-6 h-6 rounded-lg border-slate-300 darkborder-slate-600 text-red-500 focusring-red-500 darkbg-slate-800 cursor-pointer transition-all
                        checked={condition.checked} onChange={() = toggleCondition(prop.id, 'mustHaves', condition.id)} 
                    div
                    span className={`text-base flex-grow select-none transition-colors pt-0.5 ${condition.checked  'text-slate-900 darktext-white font-bold'  'text-slate-600 darktext-slate-400 font-medium'}`}{condition.text}span
                  label
                ))
              )}
            div
          div

          div className=bg-white darkbg-slate-800 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700 overflow-hidden mb-8
            div className=bg-gradient-to-r from-emerald-50 to-teal-50 darkfrom-emerald-90020 darkto-teal-90020 p-5 flex justify-between items-end border-b border-emerald-100 darkborder-emerald-90030
              divh3 className=text-xl font-black text-emerald-600 darktext-emerald-400 flex items-center gap-2Plus size={20} strokeWidth={3}  加分項 (Nice to Have)h3div
              div className=text-right
                span className=text-3xl font-black text-emerald-600 darktext-emerald-400{niceToHaveChecked}spanspan className=text-sm font-bold text-emerald-400 darktext-emerald-50070  {niceToHaveTotal}span
              div
            div

            div className=w-full bg-slate-100 darkbg-slate-70050 h-2
              div className=bg-gradient-to-r from-emerald-400 to-teal-500 h-2 transition-all duration-700 ease-out style={{ width `${niceProgress}%` }}div
            div

            div className=p-2
               {prop.conditions.niceToHaves.length === 0  (
                 p className=p-6 text-center text-slate-400尚未設定條件p
              )  (
                prop.conditions.niceToHaves.map(condition = (
                  label key={condition.id} className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl transition-all m-1 hoverbg-slate-50 darkhoverbg-slate-70050 ${condition.checked  'bg-emerald-5050 darkbg-emerald-90010'  ''}`}
                    div className=relative flex items-start pt-1
                      input type=checkbox className=w-6 h-6 rounded-lg border-slate-300 darkborder-slate-600 text-emerald-500 focusring-emerald-500 darkbg-slate-800 cursor-pointer transition-all
                        checked={condition.checked} onChange={() = toggleCondition(prop.id, 'niceToHaves', condition.id)} 
                    div
                    span className={`text-base flex-grow select-none transition-colors pt-0.5 ${condition.checked  'text-slate-900 darktext-white font-bold'  'text-slate-600 darktext-slate-400 font-medium'}`}{condition.text}span
                  label
                ))
              )}
            div
          div
        div
      div
    );
  };

  const renderSettingsView = () = {
    return (
      div className=max-w-3xl mx-auto min-h-screen animate-in slide-in-from-bottom-8 duration-300 pb-20
        div className=sticky top-0 z-20 bg-slate-5080 darkbg-slate-90080 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-slate-20050 darkborder-slate-70050 shadow-sm
          div className=flex items-center gap-4
            button onClick={() = setCurrentView('list')} className=p-2.5 bg-white darkbg-slate-800 text-slate-600 darktext-slate-300 hoverbg-slate-100 darkhoverbg-slate-700 rounded-full transition-colors shadow-sm border border-slate-200 darkborder-slate-700
              X size={20} 
            button
            h2 className=text-xl font-black text-slate-800 darktext-white flex items-center gap-2
              Settings2 size={24} className=text-blue-500 預設評分條件
            h2
          div
        div

        div className=p-4 space-y-6 mt-2
          div className=bg-indigo-50 darkbg-indigo-90020 p-5 rounded-3xl text-sm text-indigo-800 darktext-indigo-300 flex gap-4 items-start border border-indigo-100 darkborder-indigo-80050
            Info size={28} className=shrink-0 text-indigo-500 
            p className=leading-relaxed font-medium
              這裡的條件為 strong「預設模板」strong。
              只有 strong未來新增的筆記strong 會套用新條件。舊筆記不受影響，以確保評分歷史獨立。
            p
          div

          div className=bg-white darkbg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700
            h3 className=text-xl font-black text-red-600 darktext-red-400 flex items-center gap-2 mb-5必需項清單h3
            form onSubmit={(e) = { e.preventDefault(); addGlobalCondition('mustHaves', newMustHave); setNewMustHave(''); }} className=flex gap-3 mb-6
              input type=text value={newMustHave} onChange={(e) = setNewMustHave(e.target.value)} placeholder=輸入新的必需條件... className=flex-grow p-3 bg-slate-50 darkbg-slate-900 border border-slate-200 darkborder-slate-700 rounded-xl focusring-2 focusring-red-500 outline-none text-sm darktext-white transition-all 
              button type=submit disabled={!newMustHave.trim()} className=bg-red-500 text-white px-6 py-3 rounded-xl hoverbg-red-600 disabledopacity-50 disabledcursor-not-allowed transition-colors font-bold shadow-sm新增button
            form
            ul className=space-y-3
              {globalConditionsTemplate.mustHaves.map(condition = (
                li key={condition.id} className=flex items-center justify-between bg-slate-50 darkbg-slate-90050 p-4 rounded-xl border border-slate-100 darkborder-slate-70050 group
                  span className=text-sm font-medium text-slate-700 darktext-slate-300{condition.text}span
                  button onClick={() = deleteGlobalCondition('mustHaves', condition.id)} className=text-slate-400 hovertext-red-500 hoverbg-red-50 darkhoverbg-red-90030 p-2 rounded-lg opacity-0 group-hoveropacity-100 transition-allTrash2 size={18} button
                li
              ))}
            ul
          div

          div className=bg-white darkbg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 darkborder-slate-700
            h3 className=text-xl font-black text-emerald-600 darktext-emerald-400 flex items-center gap-2 mb-5加分項清單h3
            form onSubmit={(e) = { e.preventDefault(); addGlobalCondition('niceToHaves', newNiceToHave); setNewNiceToHave(''); }} className=flex gap-3 mb-6
              input type=text value={newNiceToHave} onChange={(e) = setNewNiceToHave(e.target.value)} placeholder=輸入新的加分條件... className=flex-grow p-3 bg-slate-50 darkbg-slate-900 border border-slate-200 darkborder-slate-700 rounded-xl focusring-2 focusring-emerald-500 outline-none text-sm darktext-white transition-all 
              button type=submit disabled={!newNiceToHave.trim()} className=bg-emerald-500 text-white px-6 py-3 rounded-xl hoverbg-emerald-600 disabledopacity-50 disabledcursor-not-allowed transition-colors font-bold shadow-sm新增button
            form
            ul className=space-y-3
              {globalConditionsTemplate.niceToHaves.map(condition = (
                li key={condition.id} className=flex items-center justify-between bg-slate-50 darkbg-slate-90050 p-4 rounded-xl border border-slate-100 darkborder-slate-70050 group
                  span className=text-sm font-medium text-slate-700 darktext-slate-300{condition.text}span
                  button onClick={() = deleteGlobalCondition('niceToHaves', condition.id)} className=text-slate-400 hovertext-red-500 hoverbg-red-50 darkhoverbg-red-90030 p-2 rounded-lg opacity-0 group-hoveropacity-100 transition-allTrash2 size={18} button
                li
              ))}
            ul
          div
        div
      div
    );
  };

  return (
    div className={`${isDarkMode  'dark'  ''} transition-colors duration-300`}
      div className=min-h-screen bg-slate-50 darkbg-slate-900 font-sans text-slate-900 darktext-slate-100 selectionbg-blue-200 darkselectionbg-blue-900
        div className=max-w-md mx-auto relative bg-slate-50 darkbg-slate-900 min-h-screen shadow-2xl smmax-w-3xl smborder-x border-slate-20050 darkborder-slate-800 transition-colors duration-300
          {currentView === 'list' && renderListView()}
          {currentView === 'detail' && renderDetailView()}
          {currentView === 'settings' && renderSettingsView()}
        div
      div

      { --- 圖片放大 Modal --- }
      {previewImage && (
        div className=fixed inset-0 z-[100] flex items-center justify-center bg-black90 backdrop-blur-sm p-4 animate-in fade-in duration-200 onClick={() = setPreviewImage(null)}
          button className=absolute top-4 right-4 smtop-6 smright-6 text-white70 hovertext-white bg-black50 hoverbg-black80 rounded-full p-2 transition-all cursor-pointer
            X size={28} 
          button
          img src={previewImage} alt=預覽放大 className=max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl onClick={e = e.stopPropagation()} 
        div
      )}

      { --- 刪除確認 Modal --- }
      {propertyToDelete && (
        div className=fixed inset-0 z-[100] flex items-center justify-center bg-slate-90060 backdrop-blur-sm p-4 animate-in fade-in duration-200
          div className=bg-white darkbg-slate-800 rounded-3xl p-6 smp-8 max-w-sm w-full shadow-2xl border border-slate-100 darkborder-slate-700 zoom-in-95 animate-in duration-200
            h3 className=text-xl font-bold text-slate-800 darktext-white mb-2確認刪除h3
            p className=text-slate-600 darktext-slate-300 mb-6 text-sm確定要永久刪除這個物件記錄嗎？這個操作無法復原。p
            div className=flex justify-end gap-3
              button onClick={() = setPropertyToDelete(null)} className=px-5 py-2.5 text-slate-600 darktext-slate-300 bg-slate-100 darkbg-slate-700 hoverbg-slate-200 darkhoverbg-slate-600 rounded-xl transition-all font-medium取消button
              button onClick={confirmDeleteProperty} className=px-5 py-2.5 bg-red-500 hoverbg-red-600 text-white rounded-xl transition-all shadow-md shadow-red-50030 font-medium確定刪除button
            div
          div
        div
      )}
    div
  );
}