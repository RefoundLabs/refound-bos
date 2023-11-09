/**
 * Project: Create
 * By: efiz.near, sking.near
 * Repository: https://github.com/near-everything/bos-workspace
 */

const Url = {
  construct: (url, params) => {
    let query = "";
    Object.keys(params || {}).forEach((key) => {
      if (params.hasOwnProperty(key)) {
        query += Url.encode(key) + "=" + Url.encode(params[key]);
        if (key !== Object.keys(params || {}).slice(-1)[0]) {
          query += "&";
        }
      }
    });
    return url + "?" + query;
  },
  // Alternative to encodeURIComponent
  encode: (str) => {
    return `${str}`
      .replace(/[!'()*]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16);
      })
      .replace(/[^!'\(\)~\*A-Za-z0-9\-_\.~]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16);
      });
  },
};


State.init({
  page: props.page ?? "projects",
  project: props.project ?? null,
});

const pages = [
  {
    id: "projects",
    title: "Projects",
    active: state.page === "projects",
    widget: "refound_create_success.near/widget/manager.index",
    provider: "refound_create_success.near/widget/Provider",
  },
  {
    id: "editor",
    title: "Editor",
    active: state.page === "editor",
    widget: "refound_create_success.near/widget/editor.index",
    provider: "refound_create_success.near/widget/Provider",
  },
  {
    id: "manage",
    title: "Manage",
    active: state.page === "manage",
    widget: "refound_create_success.near/widget/project.index",
    provider: "refound_create_success.near/widget/Provider",
  },
];
const activePage = pages.find((p) => p.active);

const navigate = (v, params) => {
  State.update({ page: v, project: params?.project });
  const url = Url.construct("#/refound_create_success.near/widget/home", params);
  Storage.set("url", url);
};

return (
  <>
    <div className="row">
      <div className="col">
        {activePage.provider ? (
          <Widget
            src={activePage.provider}
            props={{
              Children: (p) => <Widget src={activePage.widget} props={p} />,
              navigate,
              project,
              ...props,
              templates: {
                Folders: "refound_create_success.near/widget/editor.uiFolders",
              },
            }}
          />
        ) : (
          <Widget
            src={activePage.widget}
            props={{ ...props, navigate, project }}
          />
        )}
      </div>
    </div>
  </>
);
