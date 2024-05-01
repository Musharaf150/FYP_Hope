import { SignIn } from "@clerk/nextjs";

export default function page() {
    return <SignIn path="/sign-in" />;
}