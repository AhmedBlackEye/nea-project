import { useUser } from "@/components/providers/supabase-user-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar() {
  const { user } = useUser();
  const emailInitials = user?.email ? user?.email[0] : "";
  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata.avatar_url} />
      <AvatarFallback>{emailInitials}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
