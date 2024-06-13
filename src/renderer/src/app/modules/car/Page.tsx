import { useContext, useEffect, useState } from "react";
import { Button, Space, Table, notification } from 'antd';
import type { TableProps } from 'antd';
import { CarModel } from "./model/Model";
import { CarService } from "./service/Service";
import { CloseButton, Modal, ModalContent, ModuleContainer } from "@renderer/components/layout/modal/ModalComponents";
import FormError, { FormButton, FormInput, FormLabel, FormSelect, FormStyle } from "@renderer/components/layout/form/FormComponents";
import { StaticConfig } from "@renderer/app/config/config";
import { LanguageContext } from "@renderer/app/contexts/LanguageContext";
import { Colors, getColorLabel } from "@renderer/app/enum/Colors";
import { ModuleTitleStyle } from "@renderer/components/Styles";
import { marcas } from "@renderer/app/enum/Marcas";

export function CarMainPage() {
  type ModelType = CarModel;
  const ApiService = new CarService();
  const defaultValue: ModelType = {
    idCar: undefined,
    model: '',
    brand: '',
    year: 0,
    price: 0,
    color: 0,
  };

  const [entries, setEntries] = useState<ModelType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ModelType>(defaultValue);
  const [formSubmit, setFormSubmit] = useState<string>(StaticConfig.createFormId);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { language } = useContext(LanguageContext);
  const Words = language.words;
  const CarWords = language.modules.carModule.words;

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setList();
  }, [showModal]);

  async function setList() {
    try {
      const response = await ApiService.getAll();
      if (response) setEntries(response);
    } catch (error) {
      notification.error({
        message: Words.error,
        description: CarWords.fetchNotificationError,
      });
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setFormData(defaultValue);
    setFormErrors({});
  }

  function handleCreate() {
    setFormSubmit(StaticConfig.createFormId);
    setShowModal(true);
    setFormData(defaultValue);
    setFormErrors({});
  }

  function handleEdit(entry: ModelType) {
    setFormSubmit(StaticConfig.updateFormId);
    setShowModal(true);
    setFormData(entry);
    setFormErrors({});
  }

  const handleConfirmDelete = async (id: number | undefined) => {
    if (id) {
      try {
        const response = await ApiService.delete(id);
        if (response) {
          notification.success({
            message: Words.success,
            description: CarWords.deleteNotificationDescription,
          });
          setList()
        }
      } catch (error) {
        notification.error({
          message: Words.error,
          description: CarWords.deleteNotificationError,
        });
      }
    }
    setConfirmDelete(false);
  };

  const handleDelete = (entry: ModelType) => {
    setFormData(entry);
    setConfirmDelete(true);
  };

  const handleCreateSubmit = async (data: ModelType) => {
    try {
      const response = await ApiService.create(data);
      notification.success({
        message: Words.success,
        description: CarWords.createNotificationDescription,
      });
    } catch (error) {
      notification.error({
        message: Words.error,
        description: CarWords.createNotificationError,
      });
    }
    handleCloseModal();
  }

  const handleUpdateSubmit = async (data: ModelType) => {
    if (data.idCar) {
      try {
        const response = await ApiService.update(data.idCar, data);
        notification.success({
          message: Words.success,
          description: CarWords.updateNotificationDescription,
        });
      } catch (error) {
        notification.error({
          message: Words.error,
          description: CarWords.updateNotificationError,
        });
      }
    }
    handleCloseModal();
  }

  function validateForm(data: ModelType) {
    const errors: Record<string, string> = {};
    if (!data.model) errors.model = CarWords.modelValidation;
    if (!data.brand) errors.brand = CarWords.brandValidation;
    if (!data.price) errors.price = CarWords.priceValidation;
    if (data.price && isNaN(Number(data.price))) errors.price = CarWords.priceValidationNaN;
    if (!data.color && data.color !== 0) errors.color = CarWords.colorValidation;
    if (!data.year) errors.year = CarWords.yearValidation;
    return errors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      if (formSubmit === StaticConfig.createFormId) {
        handleCreateSubmit(formData);
      } else if (formSubmit === StaticConfig.updateFormId) {
        handleUpdateSubmit(formData);
      }
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }

  function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "color" ? Number(value) : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
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
      key: 'color',
      render: (text) => <a>{getColorLabel(Number(text))}</a>,
    },
    {
      title: CarWords.price,
      dataIndex: 'price',
      key: 'price',
      render: (text) => <a>R$ {text},00</a>,
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
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>{Words.edit}</Button>
          <Button onClick={() => handleDelete(record)}>{Words.delete}</Button>
        </Space>
      ),
    }
  ];

  return (
    <ModuleContainer>
      <ModuleTitleStyle>{language.modules.carModule.label}</ModuleTitleStyle>
      <FormButton onClick={handleCreate}>{Words.create}</FormButton>
      <Table columns={columns} dataSource={entries} rowKey="idCar" style={{ width: "90%" }} />

      {showModal &&
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <FormStyle onSubmit={handleSubmit}>
              <FormInput type="hidden" name="idCar" value={formData.idCar} />
              <FormLabel htmlFor="model">{CarWords.model}</FormLabel>
              <FormInput
                type="text"
                name="model"
                onChange={handleOnChange}
                placeholder={CarWords.placeholdermodel}
                value={formData.model}
              />
              {formErrors.model && <FormError>{formErrors.model}</FormError>}
              <FormLabel htmlFor="brand">{CarWords.brand}</FormLabel>
              {/* <FormInput
                type="text"
                name="brand"
                onChange={handleOnChange}
                placeholder={CarWords.placeholderbrand}
                value={formData.brand}
              /> */}
              <FormSelect name="brand" onChange={handleOnSelect} value={formData.brand}>
                <option>--------</option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </FormSelect>
              {formErrors.brand && <FormError>{formErrors.brand}</FormError>}
              <FormLabel htmlFor="price">{CarWords.price}</FormLabel>
              <FormInput
                type="number"
                name="price"
                onChange={handleOnChange}
                placeholder={CarWords.placeholderprice}
                value={formData.price}
              />
              {formErrors.price && <FormError>{formErrors.price}</FormError>}
              <FormLabel htmlFor="color">{CarWords.color}</FormLabel>
              <FormSelect name="color" onChange={handleOnSelect} value={formData.color}>
                <option>--------</option>
                {Object.values(Colors)
                  .filter(value => typeof value === 'number')
                  .map((colorValue) => (
                    <option key={colorValue as number} value={colorValue as number}>
                      {getColorLabel(colorValue as number)}
                    </option>
                  ))}

              </FormSelect>
              {formErrors.color && <FormError>{formErrors.color}</FormError>}
              <FormLabel htmlFor="year">{CarWords.year}</FormLabel>
              <FormSelect name="year" onChange={handleOnSelect} value={formData.year}>
                <option value="">--------</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
              </FormSelect>
              {formErrors.year && <FormError>{formErrors.year}</FormError>}
              <FormButton type="submit">{Words.send}</FormButton>
            </FormStyle>
          </ModalContent>
        </Modal>
      }

      {confirmDelete && (
        <Modal>
          <ModalContent>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{Words.confirmationDeleteMessage}</p>
              <Button onClick={() => handleConfirmDelete(formData.idCar)}>{Words.confirm}</Button>
              <Button onClick={() => setConfirmDelete(false)}>{Words.cancel}</Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </ModuleContainer>
  );
}

