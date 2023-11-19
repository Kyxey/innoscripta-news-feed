import { Tooltip as TooltipLib } from "react-tooltip";

type Props = {
  id: string;
};

function Tooltip({ id }: Props) {
  return (
    <TooltipLib
      id={id}
      openEvents={{
        mouseenter: true,
        focus: true,
        click: true,
        dblclick: true,
        mousedown: true,
      }}
      closeEvents={{
        blur: true,
        click: false,
        dblclick: false,
        mouseleave: true,
        mouseup: false,
      }}
    />
  );
}

export default Tooltip;
