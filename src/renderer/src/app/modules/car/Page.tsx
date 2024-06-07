import { useContext, useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { notification } from 'antd';
import { CarModel } from "./model/Model";
import { CarService } from "./service/Service";
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import { FormButton, FormInput, FormLabel, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { StaticConfig } from "@renderer/app/config/config";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import styled from "styled-components";

export function CarMainPage() {

  type ModelType = CarModel
  const ApiService = new CarService();
  const defaltValue: ModelType = {
    idCar: undefined,
    model: '',
    brand: '',
    year: 0,
    price: 0,
    color: 0
  }

  const [entries, setEntries] = useState<ModelType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ModelType>(defaltValue);
  const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { language } = useContext(LanguageContext)
  const Words = language.words
  const CarWords = language.modules.carModule.words

  useEffect(() => {
    setList();
  }, [showModal])

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

  const handleConfirmDelete = async (id: number | undefined) => {
    if (id) {
      const response = await ApiService.delete(id);
      if (response) {
        notification.success({
          message: Words.success,
          description: CarWords.deleteNotificationDescription,
        });
        setList();
      }
    }
    setConfirmDelete(false);
  };

  const handleDelete = (entry: ModelType) => {
    setFormData(entry)
    setConfirmDelete(true);
  };

  const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
    event.preventDefault()
    const response = await ApiService.create(data)
    if (response) {
      notification.success({
        message: Words.success,
        description: CarWords.createNotificationDescription,
      });
      setList()
    }
    handleCloseModal()
  }

  const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>, data: ModelType) => {
    event.preventDefault()
    if (data.idCar) {
      const response = await ApiService.update(data.idCar, data)
      if (response) {
        notification.success({
          message: Words.success,
          description: CarWords.updateNotificationDescription,
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

  function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) { // Alterando para ChangeEvent<HTMLSelectElement>
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  

  const columns: TableProps<ModelType>['columns'] = [
    {
      title: 'IdCar',
      dataIndex: 'idCar',
      key: 'idCar',
      render: (text) => <a>{text}</a>,
    },
    {
      title: CarWords.model,
      dataIndex: 'model',
      key: 'model',
      render: (text) => <a>{text}</a>,
    },
    {
      title: CarWords.brand,
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => <a>{text}</a>,
    },
    {
      title: CarWords.color,
      dataIndex: 'color',
      key: 'model',
      render: (text) => <a>{text}</a>,
    },
    {
      title: CarWords.price,
      dataIndex: 'price',
      key: 'price',
      render: (text) => <a>{text}</a>,
    },
    {
      title: CarWords.year,
      dataIndex: 'year',
      key: 'year',
      render: (text) => <a>{text}</a>,
    },
    {
      title: Words.actions,
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>{Words.edit}</Button>
          <Button onClick={() => handleDelete(record)}>{Words.cancel}</Button>
        </Space>
      ),
    }
  ]


  return (
    <ModuleContainer>
      <ModuleTitleStyle>{language.modules.carModule.label}</ModuleTitleStyle>
      <FormButton onClick={() => handleCreate()} >{Words.create}</FormButton>
      <Table columns={columns} dataSource={entries} style={{ width: "90%" }} />

      {showModal &&
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <FormStyle onSubmit={handleSubmit}>
              <FormInput type="hidden" name="id" disabled value={formData.idCar} />
              <FormLabel htmlFor="model"> {CarWords.model}</FormLabel>
              <FormInput type="text" name="model" onChange={handleOnChange} placeholder="Insira o Modelo" value={formData.model} />
              <FormLabel htmlFor="brand">{CarWords.brand}</FormLabel>
              <FormInput type="text" name="brand" onChange={handleOnChange} placeholder="Insira a Marca" value={formData.brand} />
              <FormLabel htmlFor="price">{CarWords.price}</FormLabel>
              <FormInput type="text" name="price" onChange={handleOnChange} placeholder="Insira a Marca" value={formData.price} />
              <FormLabel htmlFor="color">{CarWords.color}</FormLabel>
              <select name="color" onChange={handleOnSelect} value={formData.color}>
                <option value="0">Red</option>
                <option value="1">Blue</option>
                <option value="2">Green</option>
                <option value="3">Yellow</option>
              </select>

              <FormLabel htmlFor="year">{CarWords.year}</FormLabel>
              <select name="year" onChange={handleOnSelect} value={formData.year}>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
              </select>
              {/* <FormInput type="number" name="year" onChange={handleOnChange} placeholder="Insira o Ano de Fabricação" value={formData.year} /> */}
              <FormButton type="submit" >{Words.send}</FormButton>
            </FormStyle>
          </ModalContent>
        </Modal>

      }
      {confirmDelete && (
        <Modal>
          <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>

            <ModalContent>
              <p>{Words.confirmationDelete}</p>
              <Button onClick={() => handleConfirmDelete(formData.idCar)}>{Words.confirm}</Button>
              <Button onClick={() => setConfirmDelete(false)}>{Words.cancel}</Button>

            </ModalContent>
          </div>
        </Modal>
      )}
    </ModuleContainer>
  )
}

const ModuleTitleStyle = styled.h1`
    color:${(props) => props.theme.text}
`;