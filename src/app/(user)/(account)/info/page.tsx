import UpdateUserInfoForm from "@/components/Forms/UpdateUserInfo";
import { nextAuthOptions } from "@/types/Auth";
import { getServerSession } from "next-auth";

const AccountInfoPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  const getUserDataReq = await fetch(`${process.env.WebUrl}/api/user/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });
  const getUserDataRes = await getUserDataReq.json();
  if (!getUserDataReq.ok) {
    return <div>{getUserDataRes.message}</div>;
  }
  return (
    <div>
      <UpdateUserInfoForm
        data={getUserDataRes.Data}
        token={session?.user?.token || ""}
      />
    </div>
  );
};

export default AccountInfoPage;
