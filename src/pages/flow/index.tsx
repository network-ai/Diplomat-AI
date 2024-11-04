import { useSetModalState } from '@/hooks/common-hooks';
import { Layout } from 'antd';
import { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Sider from './flow-sider';
import { useFetchDataOnMount } from './hooks';

const { Content } = Layout;

function RagFlow() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    visible: chatDrawerVisible,
    hideModal: hideChatDrawer,
    showModal: showChatDrawer,
  } = useSetModalState();

  useFetchDataOnMount();

  return (
    <Layout>
      <ReactFlowProvider>
        <Sider setCollapsed={setCollapsed} collapsed={collapsed}></Sider>
        <Layout>
          {/* <FlowHeader showChatDrawer={showChatDrawer}></FlowHeader>
          <Content style={{ margin: 0 }}>
            <FlowCanvas
              chatDrawerVisible={chatDrawerVisible}
              hideChatDrawer={hideChatDrawer}
            ></FlowCanvas>
          </Content> */}
          <iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/05c65fd3-490d-48e3-88f1-6b4d44603754/page/wSqJE" frameBorder="0" allowFullScreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </Layout>
      </ReactFlowProvider>
    </Layout>
  );
}

export default RagFlow;
