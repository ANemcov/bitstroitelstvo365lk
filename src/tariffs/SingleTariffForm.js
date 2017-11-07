import React from 'react';
import Timezone from './Timezone.js';

const SingleTariffForm = (props) =>
<form>
    <div className="row">    
        <div className="col-md-6">
            <div className="form-group">
                <label>Тариф</label>
                <input type="text" className="form-control" disabled defaultValue={props.mytariff ? props.mytariff.Tariff.Name : props.tariff.TariffName} />
            </div>           
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label>Конфигурация</label>
                <input type="text" className="form-control" disabled defaultValue={props.mytariff ? props.mytariff.App.ConfigName : props.tariff.Config.Name} />
            </div>            
        </div>
    </div>

    <div className="row">
        <div className="col-md-12">
            <div className="form-group">
                <label>Имя приложения (название базы)</label>
                <input type="text" className="form-control" defaultValue={props.mytariff ? props.mytariff.App.Name : props.tariff.Config.Name} />
            </div>
        </div>
    </div>
    
    <div className="row">
        <div className="col-md-12">
            <div className="form-group">
                <label>Часовой пояс</label>
                <Timezone onChange={props.onTimezoneChange} />
            </div>
        </div>
    </div>

    {props.tariff.Modules.length > 0 &&
        <div className="row">    
            <div className="col-md-12">
                <Modules tariff={props.tariff} mytariff={props.mytariff} onModuleChange={props.onModuleChange} />
            </div>
        </div>
    }

    <div className="row">
        <div className="col-md-6">
            <div className="form-group">
                <label>Количество пользователей</label>
                <input type="number" className="form-control" 
                    defaultValue={props.mytariff ? props.mytariff.Nusers : props.tariff.MinAmountOfLicenses} 
                    min={props.tariff.MinAmountOfLicenses} 
                    max={props.tariff.MaxAmountOfLicenses}
                    onChange={props.onUsersChange}
                />
            </div>    
        </div>
        <div className="col-md-6">
            <label>Ограничения:</label><br />
            <label>Максимальное: {props.tariff.MaxAmountOfLicenses}</label><br />
            <label>Минимальное: {props.tariff.MinAmountOfLicenses}</label>
        </div>        
    </div>
</form>

const Modules = (props) =>
<div className="form-group">
    <label>Модули</label>
    {props.tariff.Modules.map(elem => 
        <div key={elem.Id}>
            <label>
                <input type="checkbox" name={elem.Id} defaultChecked={elem.Mandatory} disabled={elem.Mandatory} onChange={props.onModuleChange} /> {elem.Name} {elem.Mandatory ? "(обязательный)" : null}
            </label>
        </div>                
    )}
</div>

const ModuleSelected = (id, mymodules) => mymodules.filter(elem => id === elem.Id).length > 0;


export default SingleTariffForm;