import PageTitle from "../../common/PageTitle/PageTitle";
import SearchedAds from "../../features/SearchedAds/SearchedAds";
import { useParams } from 'react-router';
import SearchForm from '../../common/SearchForm/SearchForm';

const Search = () => {
  const { searchPhrase } = useParams();

  return (
    <section>
      <PageTitle>{`Search results for ${searchPhrase}`}</PageTitle>
      <SearchForm />
      <SearchedAds searchPhrase={searchPhrase} />
    </section>
  );
};

export default Search;