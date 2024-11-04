import { Button, Col, Form, Input, Row } from 'antd';
// import 'antd/dist/antd.css';
import React, { ChangeEvent, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';

const DocumentGenerator: React.FC = () => {
  // const [richText, setRichText] = useState('<p>NON-DISCLOSURE AGREEMENT (NDA)</p>');

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };
  const [html, setHtml] = useState<string>('my <b>HTML</b>');

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setHtml(e.target.value);
  }
  
  return (
    <Row gutter={16} style={{ padding: '1rem' }}>
      {/* Left side - Form */}
      <Col span={5}>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Negara Tujuan Ekspor"
            name="documentName"
            // rules={[{ required: true, message: 'Nama dokumen diperlukan' }]}
          >
            <Input placeholder="Mesir" />
          </Form.Item>
          
          {/* <Form.Item
            label="Tanggal"
            name="date"
            // rules={[{ required: true, message: 'Tanggal diperlukan' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item> */}
          
          <Form.Item
            label="Komoditas"
            name="disclosingParty"
          >
            <Input placeholder="Kopi" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">Generate</Button>
          </Form.Item>
        </Form>
      </Col>

      {/* Right side - Rich Text Editor */}
      <Col span={18}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: 'red' }}>Export To PDF</Button>
        </div>
        
        {/* <ReactQuill theme="snow" value={richText} onChange={setRichText} /> */}
        <FroalaEditorComponent tag='textarea'/>
      </Col>
    </Row>
  );
};

export default DocumentGenerator;
