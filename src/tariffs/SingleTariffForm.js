import React from 'react';

const SingleTariffForm = (props) =>
<form>
    <div className="row">
        <div className="col-md-6">
            <div class="form-group">
                <label>Имя приложения</label>
                <input type="text" className="form-control" defaultValue={props.mytariff.App.Name} />
            </div>
        </div>
    </div>
    (//TODO: for adding tatiff - TimeZone selector)
    <div className="row">    
        <div className="col-md-6">
            <div class="form-group">
                <label>Тариф</label>
                <input type="text" className="form-control" disabled defaultValue={props.mytariff.Tariff.Name} />
            </div>           
        </div>
    </div>
    <div className="row">    
        <div className="col-md-6">
            <div class="form-group">
                <label>Конфигурация</label>
                <input type="text" className="form-control" disabled defaultValue={props.mytariff.App.ConfigName} />
            </div>            
        </div>
    </div>
    <div className="row">    
        <div className="col-md-6">
            <div class="form-group">
                <label>Модули</label>
                {props.mytariff.Modules.map(elem => 
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value={elem.Id} checked /> {elem.Name}
                        </label>
                    </div>                
                )}
            </div>
        </div>
    </div>

    <div className="row">
        <div className="col-md-6">
            <div class="form-group">
                <label>Количество пользователей</label>
                <input type="number" className="form-control" defaultValue={props.mytariff.Nusers} />
            </div>    
        </div>
    </div>
</form>


export default SingleTariffForm;