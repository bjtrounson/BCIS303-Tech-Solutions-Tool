import { TechConceptsEntity } from "../pages/api/data";

type Props = {
    data: TechConceptsEntity[]
}

const Table = ({data}: Props) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <th className="px-2">#</th>
                    <th className="px-2">Tech Concept</th>
                    <th className="px-2 text-center">Potential Applications</th>
                    <th className="px-2 text-center">Real Life Implementations</th>
                </thead>
                <tbody>
                    {
                        data.map((concept, index) => {
                            return (
                                <tr key={index}>
                                    <td className="fw-bold align-middle">{index}</td>
                                    <td className="align-middle">
                                        {concept.name}
                                    </td>
                                    {concept.potentialApplications?.map((application, index) => {
                                        return (
                                            <>
                                                <td className="text-center align-middle">
                                                    {application.name}
                                                </td>
                                                <td className="text-center align-middle">
                                                    <div>
                                                        {application.implementations?.map((implementation, index) => {
                                                            return (
                                                                <div key={index}>{implementation}</div>
                                                            )
                                                        })}
                                                    </div>
                                                </td>
                                            </>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;