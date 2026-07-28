import { useTheme } from "../../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ToogleThemeBtn = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Toggle theme"
        >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
    );
};

export default ToogleThemeBtn;
