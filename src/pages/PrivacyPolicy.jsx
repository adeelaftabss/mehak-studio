import LegalPage from "./LegalPage";
import { privacyPolicy } from "../data/legal";

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" sections={privacyPolicy} path="/privacy-policy" />;
}
