import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authslice.ts";
import type { RootState } from "../store/store.ts";

export function ProfileIcon() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Optionally redirect to login page
    navigate("/login");
  };
  const user = useSelector((state: RootState) => state.auth.user);
  if(user){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-700" onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}else{
  return <Button onClick={()=>{navigate("/login")}}>Sign in</Button>
}
}
