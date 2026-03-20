import React from 'react';

const OfferPage = () => {
    return (
        <div className="bg-dark-soft p-8">
            <h1 className="text-2xl font-bold text-center mb-4">Публичная оферта</h1>
            <div className="text-parchment mb-6">
                <h2 className="text-xl font-semibold">Предложение</h2>
                <p>��то публичное предложение (оферта) заключить договор на условиях, изложенных в данном документе.</p>
            </div>
            <div className="text-parchment mb-6">
                <h2 className="text-xl font-semibold">Условия</h2>
                <p>Условия оказания услуг, требования к пользователю и минимальные параметры;</p>
            </div>
            <div className="text-parchment mb-6">
                <h2 className="text-xl font-semibold">Права и обязанности</h2>
                <p>Права и обязанности сторон, ответственность за нарушение условий оферты;</p>
            </div>
            <div className="text-parchment mb-6">
                <h2 className="text-xl font-semibold">Контакты</h2>
                <p>Контактные данные для связи, где можно получить дополнительную информацию;</p>
            </div>
        </div>
    );
};

export default OfferPage;