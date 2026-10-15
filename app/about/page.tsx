import { permanentRedirect } from "next/navigation";

export default function RetiredPage() {
  permanentRedirect("/industries/manufacturers");
}
