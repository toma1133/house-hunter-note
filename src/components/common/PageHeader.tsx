import { MouseEventHandler, useState, useRef, useEffect } from "react";
import {
    ArrowLeft,
    Edit3,
    Home,
    LogOut,
    Plus,
    Settings2,
    Trash2,
    Users,
    Bot,
    DownloadCloud,
    UploadCloud,
    MoreVertical,
} from "lucide-react";
import ToogleThemeBtn from "./ToggleThemeBtn";
import useAuth from "../../hooks/UseAuth";

type PageHeaderProps = {
    mode: "list" | "detail";
    // List mode props
    onAddBtnClick?: MouseEventHandler<HTMLButtonElement>;
    addBtnLabel?: string;
    onSettingsBtnClick?: MouseEventHandler<HTMLButtonElement>;
    onShareBtnClick?: MouseEventHandler<HTMLButtonElement>;
    onExportAiBtnClick?: MouseEventHandler<HTMLButtonElement>;
    onImportAiBtnClick?: MouseEventHandler<HTMLButtonElement>;
    // Detail mode props
    onBackBtnClick?: MouseEventHandler<HTMLButtonElement>;
    score?: number;
    title?: string;
    subtitle?: string;
    totalPrice?: number;
    onEditBtnClick?: MouseEventHandler<HTMLButtonElement>;
    onDeleteBtnClick?: MouseEventHandler<HTMLButtonElement>;
};

const PageHeader = ({
    mode,
    onAddBtnClick,
    addBtnLabel,
    onSettingsBtnClick,
    onShareBtnClick,
    onExportAiBtnClick,
    onImportAiBtnClick,
    onBackBtnClick,
    score,
    title,
    subtitle,
    totalPrice,
    onEditBtnClick,
    onDeleteBtnClick,
}: PageHeaderProps) => {
    const { signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-2 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl py-3 rounded-2xl px-4 border border-slate-200/60 dark:border-slate-800/80 shadow-md shadow-slate-200/20 dark:shadow-slate-950/20 transition-all duration-300 mb-6">
            <div className="flex justify-between items-center gap-2">
                {mode === "list" ? (
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {onBackBtnClick && (
                            <button
                                type="button"
                                onClick={onBackBtnClick}
                                className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors shrink-0 mr-1"
                                title="返回"
                            >
                                <ArrowLeft size={18} />
                            </button>
                        )}
                        <div className="p-2 bg-blue-600/10 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 hidden sm:block">
                            <Home size={22} className="sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent tracking-tight truncate">
                                {title || "我的看房計畫"}
                            </h1>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest hidden sm:block truncate">
                                {title ? "看屋筆記 / House Hunter Note" : "House Hunter Note"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <button
                            type="button"
                            onClick={onBackBtnClick}
                            className="p-2 sm:px-3.5 sm:py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors text-sm flex items-center gap-1.5 shrink-0 shadow-sm border border-slate-200/60 dark:border-slate-700"
                        >
                            <ArrowLeft size={18} />
                            <span className="hidden sm:inline">返回列表</span>
                        </button>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate tracking-tight">
                                {title || "物件詳細紀錄"}
                            </h1>
                            {subtitle && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {mode === "list" ? (
                        <>
                            {onAddBtnClick && (
                                <button
                                    type="button"
                                    onClick={onAddBtnClick}
                                    className="p-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 font-bold text-xs sm:text-sm active:scale-95 shrink-0"
                                >
                                    <Plus size={18} />
                                    <span className="hidden sm:inline">{addBtnLabel || "新增紀錄"}</span>
                                </button>
                            )}
                            
                            {/* Desktop Actions */}
                            <div className="hidden sm:flex items-center gap-2">
                                {onShareBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onShareBtnClick}
                                        className="p-2.5 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-xl transition-colors"
                                        title="共享計畫與成員"
                                    >
                                        <Users size={20} />
                                    </button>
                                )}
                                {onExportAiBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onExportAiBtnClick}
                                        className="p-2.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/50 rounded-xl transition-colors flex items-center gap-1"
                                        title="匯出 AI 提示詞"
                                    >
                                        <Bot size={20} />
                                        <DownloadCloud size={14} />
                                    </button>
                                )}
                                {onImportAiBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onImportAiBtnClick}
                                        className="p-2.5 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-800/50 rounded-xl transition-colors flex items-center gap-1"
                                        title="匯入 AI 產生的結果"
                                    >
                                        <Bot size={20} />
                                        <UploadCloud size={14} />
                                    </button>
                                )}
                                {onSettingsBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onSettingsBtnClick}
                                        className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                        title="預設評分條件設定"
                                    >
                                        <Settings2 size={20} />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                    title="登出"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>

                            <ToogleThemeBtn />

                            {/* Mobile Menu Toggle */}
                            <div className="relative sm:hidden" ref={menuRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                >
                                    <MoreVertical size={20} />
                                </button>
                                
                                {isMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 flex flex-col">
                                        {onShareBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onShareBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Users size={16} /> 共享計畫與成員
                                            </button>
                                        )}
                                        {onExportAiBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onExportAiBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Bot size={16} /> <span className="flex items-center gap-1">匯出 AI 提示詞 <DownloadCloud size={14} /></span>
                                            </button>
                                        )}
                                        {onImportAiBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onImportAiBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Bot size={16} /> <span className="flex items-center gap-1">匯入 AI 結果 <UploadCloud size={14} /></span>
                                            </button>
                                        )}
                                        {onSettingsBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onSettingsBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Settings2 size={16} /> 評分條件設定
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => { signOut(); setIsMenuOpen(false); }}
                                            className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                        >
                                            <LogOut size={16} /> 登出
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-1">
                                {totalPrice !== undefined && (
                                    <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/60 shrink-0">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider hidden md:inline">
                                            總價
                                        </span>
                                        <span className="text-sm sm:text-xl font-black text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                            {totalPrice} 萬
                                        </span>
                                    </div>
                                )}

                                {score !== undefined && (
                                    <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/60 shrink-0">
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider hidden md:inline">
                                            Score
                                        </span>
                                        <span
                                            className={`text-sm sm:text-xl font-black whitespace-nowrap ${
                                                score >= 80
                                                    ? "text-emerald-500"
                                                    : score >= 60
                                                    ? "text-blue-500"
                                                    : score > 0
                                                        ? "text-amber-500"
                                                        : "text-slate-400"
                                            }`}
                                        >
                                            {score}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Desktop Actions */}
                            <div className="hidden sm:flex items-center gap-2">
                                {onEditBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onEditBtnClick}
                                        className="p-2.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-xl transition-colors"
                                        title="編輯物件"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                )}

                                {onDeleteBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onDeleteBtnClick}
                                        className="p-2.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-xl transition-colors"
                                        title="刪除物件"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}

                                {onSettingsBtnClick && (
                                    <button
                                        type="button"
                                        onClick={onSettingsBtnClick}
                                        className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                        title="預設評分條件設定"
                                    >
                                        <Settings2 size={18} />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                    title="登出"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>

                            <ToogleThemeBtn />

                            {/* Mobile Menu Toggle */}
                            <div className="relative sm:hidden" ref={menuRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                >
                                    <MoreVertical size={20} />
                                </button>
                                
                                {isMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 flex flex-col">
                                        {onEditBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onEditBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Edit3 size={16} /> 編輯物件
                                            </button>
                                        )}
                                        {onDeleteBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onDeleteBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                            >
                                                <Trash2 size={16} /> 刪除物件
                                            </button>
                                        )}
                                        {onSettingsBtnClick && (
                                            <button
                                                type="button"
                                                onClick={(e) => { onSettingsBtnClick(e); setIsMenuOpen(false); }}
                                                className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Settings2 size={16} /> 評分條件設定
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => { signOut(); setIsMenuOpen(false); }}
                                            className="w-full px-4 py-2 text-left flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                        >
                                            <LogOut size={16} /> 登出
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default PageHeader;
