import Icon from "components/Icon";
import { SHARE_BASE64_MARKDOWN_KEY, SHARE_PAGE } from "constants/share";
import MetaInput from "features/MetaInput";
import PageTemplateList from "features/Toolbar/PageTemplateList";
import { download } from "helpers/file";
import { encodeString } from "helpers/pako";
import { useEffect, useState } from "react";

import { IconList, Wrapper } from "./styled";

const TOOL_TYPE = {
  none: "none",
  templates: "templates",
};

const ToolBar = ({
  print,
  githubLink,
  templates,
  onAddPageFromTemplate,
  html,
  markdown,
}) => {
  const [Tools, setTools] = useState({});

  useEffect(() => {
    setTools({
      templates: () => (
        <>
          {templates && (
            <PageTemplateList
              templates={templates}
              onClick={onAddPageFromTemplate}
            />
          )}
        </>
      ),
    });
  }, [templates, onAddPageFromTemplate]);

  const [type, setType] = useState(TOOL_TYPE.templates);

  const setTool = (newType) => {
    if (newType === type) setType(TOOL_TYPE.none);
    else setType(newType);
  };

  const openGithubLink = () => {
    window.open(githubLink, "_blank");
  };

  const shareLink = `./${SHARE_PAGE}?${SHARE_BASE64_MARKDOWN_KEY}=${encodeString(
    markdown,
  )}`;
  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const Tool = Tools[type] || null;
  return (
    <Wrapper>
      <IconList>
        <Icon.github onClick={openGithubLink} />
        <Icon.add onClick={() => setTool(TOOL_TYPE.templates)} />
        {html && <Icon.download onClick={() => download("slide", html)} />}
        {html && <Icon.print onClick={print} />}
        {html && (
          <MetaInput url={shareLink} onSubmit={openLink}>
            <Icon.newTab />
          </MetaInput>
        )}
      </IconList>
      {Tool && <Tool />}
    </Wrapper>
  );
};

export default ToolBar;
