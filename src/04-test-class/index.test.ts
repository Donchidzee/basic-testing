import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(200)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);
    expect(() => account1.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    account1.transfer(30, account2);
    expect(account1.getBalance()).toBe(70);
    expect(account2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(200);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
    expect(result).toBe(200);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(200);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
