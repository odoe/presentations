/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// import esri = __esri;

import Accessor from "esri/core/Accessor";
import { subclass, property, declared } from "esri/core/accessorSupport/decorators";

@subclass()
class Base1 extends declared(Accessor) {
  @property()
  prop1: number;
}

@subclass()
class Base2 extends declared(Accessor) {
  @property()
  prop2: number;
}

export interface Klass extends Base1, Base2 {}

@subclass()
export class Klass extends declared(Base1, Base2) {
  constructor(obj?: ConstructProperties) {
    super();
  }
}

interface ConstructProperties {
}

// Multiple inheritance works both at runtime (through `declared`)
// and at type-check time due to declaration merging
const instance = new Klass();
instance.prop1;
instance.prop2;

export default Klass;
