import DocumentGenerator from '@/components/generate-pdf/DocumentGenerator';
import { useClickDrawer } from '@/components/pdf-drawer/hooks';
import {
  useNextFetchKnowledgeList,
  useSelectTestingResult,
} from '@/hooks/knowledge-hooks';
import { useGetPaginationWithRouter } from '@/hooks/logic-hooks';
import {
  Input,
  Layout,
  PaginationProps
} from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendQuestion, useShowMindMapDrawer } from './hooks';
import styles from './index.less';

const { Content } = Layout;
const { Search } = Input;

const SearchPage = () => {
  const { t } = useTranslation();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { chunks, total } = useSelectTestingResult();
  const { list: knowledgeList } = useNextFetchKnowledgeList();
  const checkedWithoutEmbeddingIdList = useMemo(() => {
    return checkedList.filter((x) => knowledgeList.some((y) => y.id === x));
  }, [checkedList, knowledgeList]);

  const {
    sendQuestion,
    handleClickRelatedQuestion,
    handleSearchStrChange,
    handleTestChunk,
    setSelectedDocumentIds,
    answer,
    sendingLoading,
    relatedQuestions,
    searchStr,
    loading,
    isFirstRender,
    selectedDocumentIds,
    isSearchStrEmpty,
  } = useSendQuestion(checkedWithoutEmbeddingIdList);
  const { visible, hideModal, documentId, selectedChunk, clickDocumentButton } =
    useClickDrawer();
  const { pagination } = useGetPaginationWithRouter();
  const {
    mindMapVisible,
    hideMindMapModal,
    showMindMapModal,
    mindMapLoading,
    mindMap,
  } = useShowMindMapDrawer(checkedWithoutEmbeddingIdList, searchStr);

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    pagination.onChange?.(pageNumber, pageSize);
    handleTestChunk(selectedDocumentIds, pageNumber, pageSize);
  };

  const InputSearch = (
    <Search
      value={searchStr}
      onChange={handleSearchStrChange}
      placeholder={t('header.search')}
      allowClear
      enterButton
      onSearch={sendQuestion}
      size="large"
      loading={sendingLoading}
      disabled={checkedWithoutEmbeddingIdList.length === 0}
      className={isFirstRender ? styles.globalInput : styles.partialInput}
    />
  );

  return (
    <>
      <Layout className={styles.searchPage}>
        {/* <SearchSidebar
          isFirstRender={isFirstRender}
          checkedList={checkedWithoutEmbeddingIdList}
          setCheckedList={setCheckedList}
        ></SearchSidebar> */}
        <Layout className={isFirstRender ? styles.mainLayout : ''}>
          <Content>
            <DocumentGenerator />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default SearchPage;
