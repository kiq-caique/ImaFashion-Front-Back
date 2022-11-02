import React from "react";
import { useParams } from "react-router-dom";
import Produto from "../components/Produto/Produto";
import Recommendations from "../components/Recommendations/Recommendations";

export default function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <Produto id={id} />
      <Recommendations id={id} />
    </div>
  );
}
