import PageTemplateList from "components/PageTemplateList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "redux/actions/pages";
import { addPage } from "redux/actions/pages";

const PageTemplateListContainer = () => {
  const { templates } = useSelector((state) => state.pages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!templates) dispatch(fetchTemplates());
  }, []);

  const onClick = (markdown) => {
    dispatch(addPage({ markdown }));
  };

  return (
    <>
      {templates && (
        <PageTemplateList templates={templates} onClick={onClick} />
      )}
    </>
  );
};

export default PageTemplateListContainer;
