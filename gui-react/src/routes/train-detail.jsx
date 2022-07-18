
import { useParams } from "react-router-dom";

export default function Train() {
  let { trainId } = useParams();

  return (
    <main>
      <h2>Train {trainId}</h2>
    </main>
  );
}
  