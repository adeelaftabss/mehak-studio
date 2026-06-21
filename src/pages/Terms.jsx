import LegalPage from "./LegalPage";
import { terms } from "../data/legal";

export default function Terms() {
  return <LegalPage title="Terms & Conditions" sections={terms} path="/terms" />;
}
