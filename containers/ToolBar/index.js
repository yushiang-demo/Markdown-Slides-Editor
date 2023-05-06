import Icon from "components/Icon";
import PageTemplateList from "containers/PageTemplateList";
import { download } from "helpers/file";
import { openHtmlWindow } from "helpers/window";
import { useState } from "react";
import { useSelector } from "react-redux";

import { IconList, Wrapper } from "./styled";

const TOOL_TYPE = {
  none: "none",
  templates: "templates",
};

const Tools = {
  templates: () => <PageTemplateList />,
};

const ToolBar = () => {
  const { html } = useSelector((state) => state.pages);
  const [type, setType] = useState(TOOL_TYPE.templates);

  const setTool = (newType) => {
    if (newType === type) setType(TOOL_TYPE.none);
    else setType(newType);
  };

  const openGithubLink = () => {
    window.open(
      "https://github.com/yushaing-frontend/Markdown-Slides-Editor",
      "_blank",
    );
  };

  const Tool = Tools[type] || null;
  return (
    <Wrapper>
      <IconList>
        <Icon.github onClick={openGithubLink} />
        <Icon.add onClick={() => setTool(TOOL_TYPE.templates)} />
        {html && <Icon.download onClick={() => download("slide", html)} />}
        {html && <Icon.newTab onClick={() => openHtmlWindow(html)} />}
      </IconList>
      {Tool && <Tool />}
    </Wrapper>
  );
};

export default ToolBar;
