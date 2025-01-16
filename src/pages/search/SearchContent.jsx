import React from "react";
import SearchDisciplinas from "./SearchDisciplinas";
import { useParams } from "react-router-dom";
import SearchLivros from "./SearchLivros";

export default function SearchContent() {
  const { filter } = useParams();

  return (
    <div>
      {filter === "subject" && <SearchDisciplinas />}
      {filter === "books" && <SearchLivros />}
    </div>
  );
}
