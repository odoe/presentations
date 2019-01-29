import React from "react";

interface LabelProps {
  handleLabelClick: (id: string) => void;
  id: string;
  title: string;
}

export default ({ handleLabelClick, id, title }: LabelProps) => (
  <mark
    className="label label-blue label-btn margin-right-quarter margin-left-quarter trailer-quarter"
    onClick={() => handleLabelClick(id)}
    title={title}
  >
    {id}
  </mark>
);
