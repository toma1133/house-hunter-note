import { useTheme } from "../../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ToogleThemeBtn = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title={theme === "light" ? "切換至深色模式" : "切換至淺色模式"}
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};

export default ToogleThemeBtn;
