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

const { handleCreateProject, projects, navigate } = props;

function renderProject({ title, tags, logo, id }) {
  return (
    <a
      className="rounded-2 overflow-hidden w-100 text-decoration-none"
      onClick={() => {
        navigate("editor", { project: id });
      }}
      href={Url.construct("#/genwav.near/widget/home", {
        page: "editor",
        project: id,
      })}
      style={{
        width: "calc( 20% - 20px )",
        maxWidth: "100%",
        backgroundColor: "#f9fbfe",
        border: "1px solid #d1d5db",
        cursor: "pointer",
      }}
    >
      <div className="ratio ratio-4x3">
        <div className="d-flex justify-content-center align-items-center bg-white">
          {logo && <img src={logo} alt={title} height={55} width={55} />}
        </div>
      </div>
      <div className="p-3">
        <h5
          className="h6 m-0"
          style={{
            lineHeight: 1.5,
          }}
        >
          {title}
        </h5>
      </div>
    </a>
  );
}

function renderHeader({ handleCreateProject }) {
  return (
    <div className="d-flex gap-4 justify-content-between py-4">
      <h4>
        Create a <span style={{ color: "#A2733B" }}>Campaign</span>
      </h4>
    </div>
  );
}

const widget = (src, props, other) => (
  <Widget src={src} props={props} {...other} />
);

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  list-style: none;
  grid-gap: 36px;
  margin-bottom: 36px;
`;

// projects = null;
return (
  <>
    {renderHeader({
      handleCreateProject,
    })}
    {!!projects && !!projects.length && (
      <Projects>{projects.map(renderProject)}</Projects>
    )}
    {(!projects || !projects.length) && (
      <div className="text-center row">
        <div className="col">
          <Widget
            src="genwav.near/widget/project.form"
            props={{
              handleCreateProject,
            }}
          />
        </div>
        <div className="col">
          <img
            src="https://bafybeibfzyfyudqfn6equrqbscrdizhki6lzyhqeq7pqpwxczjcrp47lfe.ipfs.w3s.link/campaignImage.png"
            style={{ borderRadius: "84px", height: "75vh", width: auto }}
          ></img>
        </div>
      </div>
    )}
  </>
);
