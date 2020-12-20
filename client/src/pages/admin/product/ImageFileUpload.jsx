import React, { useEffect, useState } from 'react';
import { Row, Typography } from 'antd';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const FilesUploader = ({ setImages }) => {
  const [picturesSet, setPicturesSet] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  });
  const { previewVisible, previewImage, fileList, previewTitle } = picturesSet;

  useEffect(() => {
    setImages(fileList);
  }, [fileList]);

  const handleCancel = () =>
    setPicturesSet({ ...picturesSet, previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPicturesSet({
      ...picturesSet,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = ({ fileList }) =>
    setPicturesSet({ ...picturesSet, fileList });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>
        Upload <span role='image'>📷</span>
      </div>
    </div>
  );
  return (
    <Row>
      <Typography.Text type='secondary' class='mb-3'>
        Add Product Images (Max 8)
      </Typography.Text>
      <Upload
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Row>
  );
};

export default FilesUploader;
