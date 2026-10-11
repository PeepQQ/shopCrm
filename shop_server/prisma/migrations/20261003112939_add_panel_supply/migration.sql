-- CreateTable
CREATE TABLE "PanelSupply" (
    "id" SERIAL NOT NULL,
    "panelId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PanelSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanelSupplyItem" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "supplyId" INTEGER NOT NULL,

    CONSTRAINT "PanelSupplyItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PanelSupply" ADD CONSTRAINT "PanelSupply_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "Panel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelSupplyItem" ADD CONSTRAINT "PanelSupplyItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanelSupplyItem" ADD CONSTRAINT "PanelSupplyItem_supplyId_fkey" FOREIGN KEY ("supplyId") REFERENCES "PanelSupply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
