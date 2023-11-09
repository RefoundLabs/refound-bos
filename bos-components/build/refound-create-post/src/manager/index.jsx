const projectsObj = props.handle["project"].getAll();
const projects = Object.keys(projectsObj || {}).map((k) => ({
  ...projectsObj[k].metadata,
  template: projectsObj[k].template.src,
  id: k,
}));

return (
  <Widget
    src="refound-create-post.near/widget/manager.ui"
    props={{
      handleCreateProject: props.handle["project"].create,
      projects,
      navigate: props.navigate,
    }}
  />
);
