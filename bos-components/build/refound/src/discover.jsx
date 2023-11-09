const ownerId = "potlock.near";
const creator = "refound_app.near"
const registryId = "refoundjournalism.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const DEFAULT_BANNER_IMAGE_URL =
  IPFS_BASE_URL + "bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
const DEFAULT_PROFILE_IMAGE_URL =
  IPFS_BASE_URL + "bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

  const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [0, 30];
const zoom = 1.7;
const accountId = context.accountId;

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const HeroOuter = styled.div`
  padding: 136px 64px;
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
  padding: 96px 64px 24px 64px;
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #2e2e2e;
  font-family: Mona-Sans;
`;

const ProjectsCount = styled.div`
  color: #7b7b7b;
  font-size: 24px;
  font-weight: 400;
  margin-left: 32px;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0px 64px 96px 64px;
  // background: #fafafa;
`;

const HeroContainer = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;
`;
const Wrapper = styled.div`
display: flex;
  width: 100%;
  height: calc(100vh - 300px);
  align-items: stretch;
  flex-direction: column;
  background: black;
  overflow: auto;
  position: relative;
  `
const Hero = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

State.init({
  registeredPosts: null, // TODO: change this back to null
  // registeredPosts: sampleProjects,
  getregisteredPostsError: "",
});

const CATEGORY_MAPPINGS = {
  "social-impact": "Social Impact",
  "non-profit": "NonProfit",
  climate: "Climate",
  "public-good": "Public Good",
  "de-sci": "DeSci",
  "open-source": "Open Source",
  community: "Community",
  education: "Education",
};

// const HIDDEN_PROJECT_IDS = ["roshaan.near"];

if (!state.registeredPosts) {
  Near.asyncView(registryId, "get_series", {})
    .then((posts) => {
        const formattedPosts = posts.map((series) => {
        
          // let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
          // if (profileData.image) {
          //   const imageUrl = getImageUrlFromSocialImage(profileData.image);
          //   if (imageUrl) profileImageUrl = imageUrl;
          // }
          // // get banner image URL
          // let bannerImageUrl = DEFAULT_BANNER_IMAGE_URL;
          // if (profileData.backgroundImage) {
          //   const imageUrl = getImageUrlFromSocialImage(profileData.backgroundImage);
          //   if (imageUrl) bannerImageUrl = imageUrl;
          // }
          const formatted = {
            ownerId: series.owner_id,
            title: series.metadata.title ?? "",
            description: series.metadata.description ?? "",
            media: series.metadata.media,
            dateTaken: series.metadata.dateTaken,
            location: series.metadata.locationTaken,
            tags: series.metadata.tags || []
          };
          console.log("series", series)
          return formatted;
        });
        State.update({
          registeredPosts: formattedPosts,
        });
      });
}

if (!state.registeredPosts) return "";

const userIsAdmin = props.registryAdmins && props.registryAdmins.includes(context.accountId);

const projects = state.registeredPosts;

return (
  <>
  <Wrapper>

   {/* MAP */}

</Wrapper>
    
    <ProjectsContainer>
      <SectionHeader>
        <SectionTitle>All posts</SectionTitle>
        <ProjectsCount>{projects.length}</ProjectsCount>
      </SectionHeader>
      <Widget
        src={`${ownerId}/widget/Project.ListSection`}
        props={{
          projects,
          renderItem: (post) => (
            <Widget
              src={`${creator}/widget/card`}
              props={{
                post,
                ...props,
              }}
            />
          ),
        }}
      />
    </ProjectsContainer>
  </>
);