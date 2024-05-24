import { useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { notification } from 'antd';
import { StaticConfig } from "@renderer/app/config/config";
import { ReselerModel } from "./model/Model";
import { ReselerService } from "./service/Service";
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { FormButton, FormInput, FormLabel, FormStyle } from "@renderer/components/layout/form/FormComponents";


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
        message: 'revendedora criado com sucesso',
        description: `O revendedora foi criado com sucesso.`,
      });
      setList()
    } else {
      console.log("Falha");

    }
    handleCloseModal()
  }

  const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>,  data: ModelType) => {
    event.preventDefault()
    if (data.id) {
      const response = await ApiService.update(data.id, data)
      if (response) {
        notification.success({
          message: 'revendedora Alterado com sucesso',
          description: `A revendedora foi alterada com sucesso.`,
        });
        setList()
      } else {
        console.log("Falha");
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
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Endereço',
      dataIndex: 'adress',
      key: 'adress',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Editar</Button>
        </Space>
      ),
    }
  ]


  return (
    <ModuleContainer>
      <h1>Revendedor</h1>
      <FormButton onClick={() => handleCreate()} >Criar</FormButton>
      <Table columns={columns} dataSource={entries} style={{width:"90%"}} />

      {showModal &&
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <FormStyle onSubmit={handleSubmit}>
              <FormInput type="hidden" name="id" disabled value={formData.id} />
              <FormLabel htmlFor="name">Nome</FormLabel>
              <FormInput type="text" name="name" onChange={handleOnChange} placeholder="Insira o Modelo" value={formData.name} />
              <FormLabel htmlFor="name">Endereço</FormLabel>
              <FormInput type="text" name="address" onChange={handleOnChange} placeholder="Insira o Endereço" value={formData.address} />
              <FormButton type="submit" >Enviar</FormButton>
            </FormStyle>
          </ModalContent>
        </Modal>

      }
    </ModuleContainer>


  )



}