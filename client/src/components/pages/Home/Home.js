import PageTitle from "../../common/PageTitle/PageTitle";
import SearchForm from "../../common/SearchForm/SearchForm";
import AllAds from "../../features/AllAds/AllAds";

const Home = () => {
  return (
    <section>
      <PageTitle>Ads</PageTitle>
      <SearchForm />
      <AllAds />
    </section>
  );
};

export default Home;