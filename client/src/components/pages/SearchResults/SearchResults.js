import PageTitle from "../../common/PageTitle/PageTitle";
import SearchedAds from "../../features/SearchedAds/SearchedAds";
import { useParams } from 'react-router';

const SearchResults = () => {
  const { searchPhrase } = useParams();

  return (
    <section>
      <PageTitle>{`Search results for ${searchPhrase}`}</PageTitle>
      <SearchedAds searchPhrase={searchPhrase} />
    </section>
  );
};

export default SearchResults;