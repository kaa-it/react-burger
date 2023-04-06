import { fetchWithRefresh } from "../utils/auth";

describe("test auth", () => {
    beforeEach(() => {
        const res = new Response();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ...res,
            json: jest.fn().mockResolvedValue(
                { result: 'OK' }
            ),
            ok: true,
        });
    });


    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("check fetchWithRefresh success", async () => {
        const data = await fetchWithRefresh('', undefined);
        expect(data).toEqual({ result: 'OK' });
    });
});