import { PasswordResetFinishModule } from './password-reset-finish.module';

describe('PasswordResetFinishModule', () => {
  let passwordResetFinishModule: PasswordResetFinishModule;

  beforeEach(() => {
    passwordResetFinishModule = new PasswordResetFinishModule();
  });

  it('should create an instance', () => {
    expect(passwordResetFinishModule).toBeTruthy();
  });
});
