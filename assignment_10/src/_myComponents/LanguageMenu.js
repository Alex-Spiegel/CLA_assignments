import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/languageSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function LanguageMenu() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.selectedLanguage);
  console.log(language);

  function handleSelect(lang) {
    dispatch(setLanguage(lang));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleSelect("Language: js")}>
          Language: js
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("Language: py")}>
          Language: py
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageMenu;
