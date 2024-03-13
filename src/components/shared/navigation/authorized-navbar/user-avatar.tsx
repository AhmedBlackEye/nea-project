import { useUser } from "@/components/providers/supabase-user-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";

function UserAvatar() {
  const { user } = useUser();
  const userFullName: string = user?.user_metadata.full_name;
  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata.avatar_url} />
      <AvatarFallback>
        {userFullName && getNameInitials(userFullName)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
