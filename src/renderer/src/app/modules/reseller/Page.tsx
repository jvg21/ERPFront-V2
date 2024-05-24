import { useContext, useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { notification } from 'antd';
import { StaticConfig } from "@renderer/app/config/config";
import { ReselerModel } from "./model/Model";
import { ReselerService } from "./service/Service";
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { FormButton, FormInput, FormLabel, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";


export function ResellerMainPage() {

  type ModelType = ReselerModel
  const ApiService = new ReselerService();
  const defaltValue: ModelType = {
    id: undefined,
    name: '',
    address: ''
  }

  const [entries, setEntries] = useState<ModelType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ModelType>(defaltValue);
  const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId)
  const { language } = useContext(LanguageContext)
  const Words = language.words
  const ResellerWords = language.modules.resellerModule.words

  useEffect(() => {
    setList();
  }, [])

  async function setList() {
    const response = await ApiService.getAll();
    if (response) setEntries(response)
  }

  function handleCloseModal() {
    setShowModal(false);
    setFormData(defaltValue);
  };

  function handleCreate() {
    setFormSubmit(StaticConfig.createFormId)
    setShowModal(true)
    setFormData(defaltValue)
    setList()
  }

  function handleEdit(entry: ModelType) {
    setFormSubmit(StaticConfig.updateFormId)
    setShowModal(true)
    setFormData(entry)
    setList()
  }



  const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
    event.preventDefault()
    const response = await ApiService.create(data)
    if (response) {
      notification.success({
        message: Words.success,
        description: ResellerWords.createNotificationDescription,
      });
      setList()
    }
    handleCloseModal()
  }

  const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>,  data: ModelType) => {
    event.preventDefault()
    if (data.id) {
      const response = await ApiService.update(data.id, data)
      if (response) {
        notification.success({
          message: Words.success,
          description: ResellerWords.updateNotificationDescription,
        });
        setList()
      }
    }
    handleCloseModal()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formSubmit === StaticConfig.createFormId) {
      handleCreateSubmit(event, formData);
    } else if (formSubmit === StaticConfig.updateFormId) {
      handleUpdateSubmit(event, formData);
    }
  }


  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const columns: TableProps<ModelType>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: ResellerWords.name,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: ResellerWords.address,
      dataIndex: 'address',
      key: 'address',
      render: (text) => <a>{text}</a>,
    },
    {
      title: Words.actions,
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>{Words.edit}</Button>
        </Space>
      ),
    }
  ]


  return (
    <ModuleContainer>
      <h1>{language.modules.resellerModule.label}</h1>
      <FormButton onClick={() => handleCreate()} >{Words.create}</FormButton>
      <Table columns={columns} dataSource={entries} style={{width:"90%"}} />

      {showModal &&
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <FormStyle onSubmit={handleSubmit}>
              <FormInput type="hidden" name="id" disabled value={formData.id} />
              <FormLabel htmlFor="name">{ResellerWords.name}</FormLabel>
              <FormInput type="text" name="name" onChange={handleOnChange} placeholder="Insira o Nome" value={formData.name} />
              <FormLabel htmlFor="address">{ResellerWords.address}</FormLabel>
              <FormInput type="text" name="address" onChange={handleOnChange} placeholder="Insira o Endereço" value={formData.address} />
              <FormButton type="submit" >{Words.send}</FormButton>
            </FormStyle>
          </ModalContent>
        </Modal>

      }
    </ModuleContainer>


  )



}