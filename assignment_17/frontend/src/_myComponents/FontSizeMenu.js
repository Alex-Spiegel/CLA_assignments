import { useSelector, useDispatch } from "react-redux";
import { setFontSize } from "@/redux/fontSizeSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function FontSizeMenu() {
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.fontSize.selectedFontSize);

  function handleSelect(size) {
    dispatch(setFontSize(size));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{fontSize}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleSelect("Font Size: 16")}>
          Font Size: 16
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("Font Size: 17")}>
          Font Size: 17
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FontSizeMenu;
