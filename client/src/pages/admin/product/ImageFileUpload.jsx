import React, { useEffect, useState } from 'react';
import { Button, Row, Typography } from 'antd';

import { Upload, Modal } from 'antd';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const FilesUploader = ({ setImages, uploadImages, images }) => {
  const [picturesSet, setPicturesSet] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });
  const { previewVisible, previewImage, fileList, previewTitle } = picturesSet;

  useEffect(() => {
    const rawImageData = fileList.map(i => i.originFileObj);
    setImages(rawImageData);
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

  const handleChange = ({ fileList }) => {
    setPicturesSet({ ...picturesSet, fileList });
  };

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
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Button
        type='primary'
        icon={<DownloadOutlined />}
        size={20}
        onClick={() => uploadImages(images)}>
        Upload
      </Button>
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
