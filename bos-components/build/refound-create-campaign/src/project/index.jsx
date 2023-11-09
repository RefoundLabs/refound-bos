const projectID = props.project;
const contractId = "refoundjournalism.near";

if (!projectID) {
  return <div>Please specify a project ID</div>;
}

const handleUpdateProject = (new_project) => {
  // props.handle["project"].update(projectID, new_project);
  // Near.call(contractId, "add_crowdfund", )
};

const projectRaw = props.handle["project"].get(projectID);

if (projectRaw === null) return "";
if (!projectRaw) return "Project not found";

const project = {
  id: projectID,
  ...projectRaw.data,
  tags: Object.keys(projectRaw.data.tags || {}),
  templateSrc: projectRaw.template.src,
  theme: projectRaw.template.theme,
};

return (
  <Widget
    src="refound-create-campaign.near/widget/project.ui"
    props={{ ...props, project: project }}
  />
);
