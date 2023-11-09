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
      href={Url.construct("#/refound-campaign.near/widget/home", {
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
        Crowdfunding <span style={{ color: "#A2733B" }}>Campaign</span>
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
  
    {(!projects || !projects.length) && (
      <div className="text-start row">
        <div className="col w-50">
          <h3>Fund my reporting campaign in</h3>
          <h3 style={{ color: "#A2733B" }}>Eastern Europe</h3>
          <p>Hey there! I'm Jane, a passionate freelance journalist on a mission to bring you the untold stories of Eastern Europe. As an independent storyteller with a shoestring budget, I'm reaching out to you, the community, to help turn this dream into reality.</p>
          
          <div style={{padding:"5%"}}></div>
          <p>Goal: $1000</p>
          <p>Progress:</p>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width: "50%", backgroundColor: "#A2733B"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div style={{padding:"5%"}}></div>
          {/* <h3>Related Post</h3>
          <Widget src={`refound_app.near/widget/card`} props={{"title":"Test", "description":"Test", "media":""}}} /> */}
        </div>
        
        <div className="col w-50">
          <img
            src="https://bafybeibfzyfyudqfn6equrqbscrdizhki6lzyhqeq7pqpwxczjcrp47lfe.ipfs.w3s.link/campaignImage.png"
            style={{ borderRadius: "84px", width: "60%", height: auto }}
          ></img>
        </div>
      </div>
    )}
  </>
);
