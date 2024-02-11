import { Container } from "inversify";
import { userModule } from "~/interfaces/http/user.module";

const container = new Container();

container.load(userModule);

export default container;
