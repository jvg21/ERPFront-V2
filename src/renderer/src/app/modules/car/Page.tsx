import { useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { notification } from 'antd';
import { CarModel } from "./model/Model";
import { CarService } from "./service/Service";
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { FormButton, FormInput, FormLabel, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { StaticConfig } from "@renderer/app/config/config";

export function CarMainPage() {

  type ModelType = CarModel
  const ApiService = new CarService();
  const defaltValue: ModelType = {
    id: undefined,
    name: '',
    brand: '',
    year: 0
  }

  const [entries, setEntries] = useState<ModelType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ModelType>(defaltValue);
  const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId)
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const handleConfirmDelete = async (id: number|undefined) => {
    if (id) {
      const response = await ApiService.delete(id);
      if (response) {
        console.log("deletando");
        notification.success({
          message: 'Carro deletado com sucesso',
          description: `O carro foi deletado com sucesso.`,
        });
        setList(); 
      } else {
        
        console.log("Falha ao deletar");
      }
    }
    setConfirmDelete(false); 
  };

  const handleDelete = (entry:ModelType) => {
    setFormData(entry)
    setConfirmDelete(true);
  };

  const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
    event.preventDefault()
    const response = await ApiService.create(data)
    if (response) {
      notification.success({
        message: 'Carro criado com sucesso',
        description: `O carro ${response.name} foi criado com sucesso.`,
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
        console.log("Criado com sucesso");
        notification.success({
          message: 'Carro Alterado com sucesso',
          description: `O carro ${response.name} foi alterado com sucesso.`,
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
      title: 'Modelo',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ano',
      dataIndex: 'year',
      key: 'year',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Editar</Button>
          <Button onClick={() => handleDelete(record)}>Deletar</Button>
        </Space>
      ),
    }
  ]


  return (
    <ModuleContainer>
      <h1>Carros</h1>
      <FormButton onClick={() => handleCreate()} >Criar</FormButton>
      <Table columns={columns} dataSource={entries} style={{width:"90%"}} />

      {showModal &&
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <FormStyle onSubmit={handleSubmit}>
              <FormInput type="hidden" name="id" disabled value={formData.id} />
              <FormLabel htmlFor="name">Modelo</FormLabel>
              <FormInput type="text" name="name" onChange={handleOnChange} placeholder="Insira o Modelo" value={formData.name} />
              <FormLabel htmlFor="name">Marca</FormLabel>
              <FormInput type="text" name="brand" onChange={handleOnChange} placeholder="Insira a Marca" value={formData.brand} />
              <FormLabel htmlFor="name">Ano</FormLabel>
              <FormInput type="number" name="year" onChange={handleOnChange} placeholder="Insira o Ano de Fabricação" value={formData.year} />
              <FormButton type="submit" >Enviar</FormButton>
            </FormStyle>
          </ModalContent>
        </Modal>

      }
      {confirmDelete && (
        <Modal>
            <div style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center"}}>

          <ModalContent>
              <p>Tem certeza que deseja deletar este carro?</p>
              <Button onClick={() => handleConfirmDelete(formData.id)}>Sim</Button>
              <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
            
          </ModalContent>
          </div>
        </Modal>
      )}
    </ModuleContainer>


  )



}